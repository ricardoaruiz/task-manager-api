/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import type { ITaksService } from '../../services/task-service.js';

const UpdateTaskParamsSchema = z.object({
  id: z.uuid('Invalid task ID'),
});

const UpdateTaskBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export async function updateTask(app: FastifyInstance, service: ITaksService) {
  return app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:id',
    schema: {
      params: UpdateTaskParamsSchema,
      body: UpdateTaskBodySchema,
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, description } = request.body;
      const updatedTask = await service.updateTask(id, { title, description });

      if (!updatedTask) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }

      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    },
  });
}
