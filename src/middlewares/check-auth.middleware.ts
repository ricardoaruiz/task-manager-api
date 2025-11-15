import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { JoseTokenService } from '@/services/token/token.service'

export const checkAuthMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.cookies.token

  if (!token) {
    return reply.status(StatusCodes.UNAUTHORIZED).send()
  }

  const payload = await new JoseTokenService().verifyToken(token)

  if (!payload) {
    return reply.status(StatusCodes.UNAUTHORIZED).send()
  }

  // Attach user info to request object
  request.userId = payload.sub
  request.userName = payload.name
  request.userEmail = payload.email
}
