import type { Task } from '../@types/domain.js';
import type { db } from '../database/db.js';
import { DuplicateTaskException } from '../exceptions/DuplicateTaskException.js';

export interface ITaksService {
  listTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | undefined>;
  createTask(data: Pick<Task, 'title' | 'description'>): Promise<Task>;
  deleteTask(id: string): Promise<number>;
  updateTask(
    id: string,
    data: Partial<Pick<Task, 'title' | 'description'>>
  ): Promise<Task | undefined>;
  completeTask(id: string, completed: boolean): Promise<Task | undefined>;
}

export class TaskService implements ITaksService {
  private readonly db;

  constructor(database: typeof db) {
    this.db = database;
  }

  /**
   * List all tasks
   * @return An array of tasks
   */
  async listTasks(): Promise<Task[]> {
    const tasks = await this.db('tasks').select('*');
    return tasks;
  }

  /**
   * Get a task by its ID
   * @param id - The ID of the task
   * @return The task if found, otherwise undefined
   */
  async getTaskById(id: string): Promise<Task | undefined> {
    return await this.db('tasks').select('*').where({ id }).first();
  }

  /**
   * Create a new task
   * @param data - The data for the new task
   * @return The created task
   * @throws DuplicateTaskException if a task with the same title already exists
   */
  async createTask(data: Pick<Task, 'title' | 'description'>): Promise<Task> {
    const { title, description } = data;

    const isThereTaskWithSameTitle = await this.db('tasks')
      .select('*')
      .where({ title })
      .first();

    if (isThereTaskWithSameTitle) {
      throw new DuplicateTaskException(
        'A task with the same title already exists'
      );
    }

    const result = await this.db('tasks')
      .insert({
        id: crypto.randomUUID(),
        title,
        description,
      })
      .returning('*');

    return result.at(0) as Task;
  }

  /**
   * Delete a task by its ID
   * @param id - The ID of the task to delete
   * @return The number of deleted records
   */
  async deleteTask(id: string): Promise<number> {
    return await this.db('tasks').where({ id }).del();
  }

  /**
   * Update a task by its ID
   * @param id - The ID of the task to update
   * @param data - The partial data to update
   * @return The updated task if found, otherwise undefined
   */
  async updateTask(
    id: string,
    data: Partial<Pick<Task, 'title' | 'description'>>
  ): Promise<Task | undefined> {
    const updatedRows = await this.db('tasks')
      .where({ id })
      .update(data)
      .returning('*');

    return updatedRows.length > 0 ? (updatedRows[0] as Task) : undefined;
  }

  /**
   * Mark a task as completed or incomplete
   * @param id - The ID of the task to update
   * @param completed - Whether the task should be marked as completed
   * @return The updated task if found, otherwise undefined
   */
  async completeTask(
    id: string,
    completed: boolean
  ): Promise<Task | undefined> {
    const updatedRows = await this.db('tasks')
      .where({ id })
      .update({ completed })
      .returning('*');

    return updatedRows.length > 0 ? (updatedRows[0] as Task) : undefined;
  }
}
