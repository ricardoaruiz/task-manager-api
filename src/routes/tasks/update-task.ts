/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import { db } from '../../database/db.js';

const UpdateTaskParamsSchema = z.object({
  id: z.uuid('Invalid task ID'),
});

const UpdateTaskBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export async function updateTask(app: FastifyInstance) {
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

      const updatedTask = await db('tasks')
        .update({ title, description })
        .where({ id })
        .returning('*');

      if (updatedTask.length === 0) {
        return reply.status(StatusCodes.NOT_FOUND).send();
      }
      return reply.status(StatusCodes.OK).send({ data: updatedTask });
    },
  });
}
