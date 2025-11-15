import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import {
  LoginRouteBodySchema,
  LoginRouteResponseSuccessSchema,
  LoginRouteResponseUnauthorizedSchema,
} from './login.schemas'
import type { RouteOptions } from './login.types'

export const loginRoute: FastifyPluginAsyncZod<RouteOptions> = async (
  app,
  options,
) => {
  app.post(
    '/login',
    {
      schema: {
        summary: 'SignIn',
        description:
          'This endpoint allows a user to log in by providing their credentials. Upon successful authentication, a JWT token is returned.',
        tags: ['Auth'],
        body: LoginRouteBodySchema,
        response: {
          [StatusCodes.OK]: LoginRouteResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: LoginRouteResponseUnauthorizedSchema,
        },
      },
    },
    async (request, reply) => {
      const { useCases } = options
      const { email, password } = request.body

      const result = await useCases.login.execute({ email, password })

      return reply
        .setCookie('token', result.token, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 2 * 60 * 60, // 2 hours
        })
        .status(200)
        .send()
    },
  )
}
