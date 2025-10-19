/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import type { ITaksService } from '../../services/task-service.js';

const CompleteTaskParamsSchema = z.object({
  id: z.uuid('Invalid task ID'),
});

const CompleteTaskBodySchema = z.object({
  completed: z.boolean(),
});

export async function completeTask(
  app: FastifyInstance,
  service: ITaksService
) {
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

      const updatedTask = await service.completeTask(id, completed);

      if (!updatedTask) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }

      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    },
  });
}
