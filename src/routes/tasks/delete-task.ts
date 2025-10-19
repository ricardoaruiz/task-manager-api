/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import type { ITaksService } from '../../services/task-service.js';

const DeleteTaskParamsSchema = z.object({
  id: z.uuid('Invalid task ID'),
});

export async function deleteTask(app: FastifyInstance, service: ITaksService) {
  return app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: DeleteTaskParamsSchema,
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      const deletedCount = await service.deleteTask(id);

      if (deletedCount === 0) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }

      return reply.status(StatusCodes.NO_CONTENT).send();
    },
  });
}
