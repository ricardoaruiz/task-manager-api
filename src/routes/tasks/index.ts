/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import { db } from '../../database/db.js';
import { type ITaksService, TaskService } from '../../services/task-service.js';
import { completeTask } from './complete-task.js';
import { createTask } from './create-task.js';
import { deleteTask } from './delete-task.js';
import { getTask } from './get-task.js';
import { listTasks } from './list-tasks.js';
import { updateTask } from './update-task.js';

export async function tasksRoutes(app: FastifyInstance) {
  const taskService: ITaksService = new TaskService(db);

  createTask(app, taskService);
  updateTask(app, taskService);
  deleteTask(app, taskService);
  listTasks(app, taskService);
  getTask(app, taskService);
  completeTask(app, taskService);
}
