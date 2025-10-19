import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function healthRoute(app: FastifyInstance) {
  return app.get('/check', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ status: 'ok' });
  });
}