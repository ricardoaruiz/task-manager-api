import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { SignupBodySchema, SignupResponseSuccessSchema } from './signup.schemas'
import type { RouteOptions } from './signup.types'

export const signupRoute: FastifyPluginAsyncZod<RouteOptions> = async (
  app,
  options,
) => {
  app.post(
    '/signup',
    {
      schema: {
        summary: 'SignUp',
        description: 'Creates a new user account with the provided details.',
        tags: ['Auth'],
        body: SignupBodySchema,
        response: {
          [StatusCodes.CREATED]: SignupResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { useCases } = options
      const { name, email, password } = request.body

      const newUser = await useCases.signup.execute({
        name,
        email,
        password,
      })

      return reply.status(StatusCodes.CREATED).send(newUser)
    },
  )
}
