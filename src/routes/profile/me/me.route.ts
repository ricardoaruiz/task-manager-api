import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import { MeResponseSuccessSchema } from './me.schema'
import type { RouteOptions } from './me.types'

export const meRoute: FastifyPluginAsyncZod<RouteOptions> = async (
  app,
  options,
) => {
  app.get(
    '/me',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Me',
        description:
          'Retrieve the profile information of the currently authenticated user.',
        tags: ['Profile'],
        response: {
          [StatusCodes.OK]: MeResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { useCases } = options
      const response = await useCases.me.execute({
        email: request.userEmail ?? '',
      })

      return reply.status(StatusCodes.OK).send(response)
    },
  )
}
