import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { db } from '../database/db.js';
import { DuplicateTaskException } from '../exceptions/DuplicateTaskException.js';

import { type ITaksService, TaskService } from './task-service.js';

describe('TaskService', () => {
  let taskService: ITaksService;

  beforeAll(() => {
    taskService = new TaskService(db);
  });

  beforeEach(async () => {
    await db('tasks').del();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'This is a new task',
      };

      const createdTask = await taskService.createTask(taskData);

      expect(createdTask).toHaveProperty('id');
      expect(createdTask.title).toBe(taskData.title);
      expect(createdTask.description).toBe(taskData.description);
    });

    it('should throw DuplicateTaskException if a task with the same title exists', async () => {
      const taskData = {
        title: 'Duplicate Task',
        description: 'This task will be duplicated',
      };

      await taskService.createTask(taskData);

      await expect(taskService.createTask(taskData)).rejects.toThrow(
        DuplicateTaskException
      );
    });
  });

  describe('listTasks', () => {
    it('should list all tasks', async () => {
      const tasksData = [
        { title: 'Task 1', description: 'First task' },
        { title: 'Task 2', description: 'Second task' },
      ];

      for (const data of tasksData) {
        await taskService.createTask(data);
      }

      const tasks = await taskService.listTasks();

      expect(tasks).toHaveLength(2);
      expect(tasks[0]?.title).toBe(tasksData[0]?.title);
      expect(tasks[1]?.title).toBe(tasksData[1]?.title);
    });
  });

  describe('getTaskById', () => {
    it('should get a task by its ID', async () => {
      const taskData = {
        title: 'Get Task',
        description: 'Task to be retrieved',
      };

      const createdTask = await taskService.createTask(taskData);
      const fetchedTask = await taskService.getTaskById(createdTask.id);

      expect(fetchedTask).toBeDefined();
      expect(fetchedTask?.id).toBe(createdTask.id);
      expect(fetchedTask?.title).toBe(createdTask.title);
    });

    it('should return undefined if task not found', async () => {
      const fetchedTask = await taskService.getTaskById('non-existent-id');

      expect(fetchedTask).toBeUndefined();
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by its ID', async () => {
      const taskData = {
        title: 'Delete Task',
        description: 'Task to be deleted',
      };

      const createdTask = await taskService.createTask(taskData);

      const fetchedTask1 = await taskService.getTaskById(createdTask.id);
      expect(fetchedTask1).toBeDefined();

      const deleteCount = await taskService.deleteTask(createdTask.id);

      const fetchedTask2 = await taskService.getTaskById(createdTask.id);
      expect(deleteCount).toBe(1);
      expect(fetchedTask2).toBeUndefined();
    });

    it('should return 0 when trying to delete a non-existent task', async () => {
      const deleteCount = await taskService.deleteTask('non-existent-id');

      expect(deleteCount).toBe(0);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const taskData = {
        title: 'Update Task',
        description: 'Task to be updated',
      };

      const createdTask = await taskService.createTask(taskData);
      expect(createdTask).toBeDefined();
      expect(createdTask?.title).toBe(taskData.title);
      expect(createdTask?.description).toBe(taskData.description);

      const updateData = {
        title: 'Updated Task Title',
        description: 'Updated Task Description',
      };

      const updatedTask = await taskService.updateTask(
        createdTask.id,
        updateData
      );

      expect(updatedTask).toBeDefined();
      expect(updatedTask?.id).toBe(createdTask.id);
      expect(updatedTask?.title).toBe(updateData.title);
      expect(updatedTask?.description).toBe(updateData.description);
    });

    it('should return undefined when trying to update a non-existent task', async () => {
      const updateData = {
        title: 'Non-existent Task',
      };

      const updatedTask = await taskService.updateTask(
        'non-existent-id',
        updateData
      );

      expect(updatedTask).toBeUndefined();
    });
  });

  describe('complete task', () => {
    it('should mark a task as completed', async () => {
      const taskData = {
        title: 'Complete Task',
        description: 'Task to be completed',
      };

      const createdTask = await taskService.createTask(taskData);
      expect(createdTask).toBeDefined();
      expect(createdTask.completed).toBe(0);

      const completedTask = await taskService.completeTask(
        createdTask.id,
        true
      );
      expect(completedTask).toBeDefined();
      expect(completedTask?.id).toBe(createdTask.id);
      expect(completedTask?.completed).toBe(1);
    });

    it('should mark a task as incomplete', async () => {
      const taskData = {
        title: 'Incomplete Task',
        description: 'Task to be marked as incomplete',
      };

      const createdTask = await taskService.createTask(taskData);
      expect(createdTask).toBeDefined();

      const completedTask = await taskService.completeTask(
        createdTask.id,
        true
      );
      expect(completedTask).toBeDefined();
      expect(completedTask?.completed).toBe(1);

      const incompletedTask = await taskService.completeTask(
        createdTask.id,
        false
      );
      expect(incompletedTask).toBeDefined();
      expect(incompletedTask?.id).toBe(createdTask.id);
      expect(incompletedTask?.completed).toBe(0);
    });

    it('should return undefined when trying to complete a non-existent task', async () => {
      const completedTask = await taskService.completeTask(
        'non-existent-id',
        true
      );

      expect(completedTask).toBeUndefined();
    });
  });
});
