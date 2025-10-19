/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../database/db.js';

type CompleteTaskParams = {
  id: string;
};

type CompleteTaskBody = {
  completed: boolean;
};

export async function completeTask(app: FastifyInstance) {
  return app.patch(
    '/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as CompleteTaskParams;
      const { completed } = request.body as CompleteTaskBody;

      const updatedTask = await db('tasks')
        .update({ completed })
        .where({ id })
        .returning('*');

      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    }
  );
}
