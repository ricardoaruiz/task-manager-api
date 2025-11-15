import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  CompleteTaskParamsSchema,
  CompleteTaskResponseSuccessSchema,
} from './complete-task.schemas'
import type { CompleteTaskOptions } from './complete-task.types'

export const completeTaskRoute: FastifyPluginAsyncZod<
  CompleteTaskOptions
> = async (app, options) => {
  const { useCases } = options

  app.patch(
    '/:id',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Complete a task',
        description:
          'Marks a task as completed in the system using its unique ID.',
        tags: ['Tasks'],
        params: CompleteTaskParamsSchema,
        response: {
          [StatusCodes.NO_CONTENT]: CompleteTaskResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      await useCases.completeTask.execute(id, request.userId ?? '')
      return reply.status(StatusCodes.NO_CONTENT).send()
    },
  )
}
