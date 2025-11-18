import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { CommonVoidResponseSchema } from '@/routes/routes.schame'

export const logoutRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    '/logout',
    {
      schema: {
        summary: 'SignOut',
        description:
          'This endpoint logs out the user by clearing the authentication cookie.',
        tags: ['Auth'],
        response: {
          [StatusCodes.OK]: CommonVoidResponseSchema,
        },
      },
    },
    async (_request, reply) => {
      reply
        .clearCookie('token', {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        .status(StatusCodes.OK)
        .send()
    },
  )
}
