/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import { db } from '../../database/db.js';

const GetTaskParamsSchema = z.object({
  id: z.uuid(),
});

export async function getTask(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: GetTaskParamsSchema,
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      const task = await db('tasks').select().where({ id }).first();

      if (!task) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }

      reply.status(StatusCodes.OK).send({ data: task });
    },
  });
}
