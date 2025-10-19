/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../database/db.js';

type DeleteTaskParams = {
  id: string;
};

export async function deleteTask(app: FastifyInstance) {
  return app.delete(
    '/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as DeleteTaskParams;

      const deletedCount = await db('tasks').where({ id }).del();

      if (deletedCount === 0) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }

      return reply.status(StatusCodes.NO_CONTENT).send();
    }
  );
}
