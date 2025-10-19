/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../database/db.js';

export async function listTasks(app: FastifyInstance) {
  return app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    const tasks = await db('tasks').select();

    reply.status(StatusCodes.OK).send({ data: tasks });
  });
}
