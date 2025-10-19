/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import { db } from '../../database/db.js';

const CompleteTaskParamsSchema = z.object({
  id: z.uuid('Invalid task ID'),
});

const CompleteTaskBodySchema = z.object({
  completed: z.boolean(),
});

export async function completeTask(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: CompleteTaskParamsSchema,
      body: CompleteTaskBodySchema,
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { completed } = request.body;

      const updatedTask = await db('tasks')
        .update({ completed })
        .where({ id })
        .returning('*');

      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    },
  });
}
