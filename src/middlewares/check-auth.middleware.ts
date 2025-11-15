import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export const checkAuthMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.cookies.token

  // TODO verificar se existe o token e se o mesmo é válido
  if (!token) {
    return reply.status(StatusCodes.UNAUTHORIZED).send()
  }
}
