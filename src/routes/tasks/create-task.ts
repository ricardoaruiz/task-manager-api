/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../database/db.js';

type CreateTaskBody = {
  title: string;
  description: string;
};

export async function createTask(app: FastifyInstance) {
  return app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, description } = request.body as CreateTaskBody;

    const createdTask = await db('tasks')
      .insert({
        id: crypto.randomUUID(),
        title,
        description,
      })
      .returning('*');

    return reply.status(StatusCodes.CREATED).send({ data: createdTask });
  });
}
