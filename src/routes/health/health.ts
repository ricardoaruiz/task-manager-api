/** biome-ignore-all lint/suspicious/useAwait: is allowed here */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export async function healthRoute(app: FastifyInstance) {
  return app.get(
    '/check',
    async (_request: FastifyRequest, reply: FastifyReply) =>
      reply.status(StatusCodes.OK).send({ status: 'ok' })
  );
}
