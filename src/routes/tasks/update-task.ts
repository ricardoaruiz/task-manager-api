/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../database/db.js';

type UpdateTaskParams = {
  id: string;
};

type UpdateTaskBody = {
  title: string;
  description: string;
};

export async function updateTask(app: FastifyInstance) {
  return app.put(
    '/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as UpdateTaskParams;
      const { title, description } = request.body as UpdateTaskBody;

      const updatedTask = await db('tasks')
        .update({ title, description })
        .where({ id })
        .returning('*');

      if (updatedTask.length === 0) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }
      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    }
  );
}
