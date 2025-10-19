/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import { completeTask } from './complete-task.js';
import { createTask } from './create-task.js';
import { deleteTask } from './delete-task.js';
import { listTasks } from './list-tasks.js';
import { updateTask } from './update-task.js';

export async function tasksRoutes(app: FastifyInstance) {
  listTasks(app);
  createTask(app);
  deleteTask(app);
  completeTask(app);
  updateTask(app);
}
