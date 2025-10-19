/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';
import z from 'zod/v4';
import { db } from '../../database/db.js';

const CreateTaskBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export async function createTask(app: FastifyInstance) {
  return app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateTaskBodySchema,
    },
    handler: async (request, reply) => {
      const { title, description } = request.body;

      const createdTask = await db('tasks')
        .insert({
          id: crypto.randomUUID(),
          title,
          description,
        })
        .returning('*');

      return reply.status(StatusCodes.CREATED).send({ data: createdTask });
    },
  });
}
