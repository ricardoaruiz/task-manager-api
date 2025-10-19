/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import type { ITaksService } from '../../services/task-service.js';

export async function listTasks(app: FastifyInstance, service: ITaksService) {
  return app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    const tasks = await service.listTasks();

    reply.status(StatusCodes.OK).send({ data: tasks });
  });
}
