import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  UnCompleteTaskParamsSchema,
  UnCompleteTaskResponseSuccessSchema,
} from './uncomplete-task.schemas'
import type { UnCompleteTaskOptions } from './uncomplete-task.types'

export const uncompleteTaskRoute: FastifyPluginAsyncZod<
  UnCompleteTaskOptions
> = async (app, options) => {
  const { useCases } = options

  app.patch(
    '/:id/uncomplete',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Uncomplete a task',
        description:
          'Marks a task as uncompleted in the system using its unique ID.',
        tags: ['Tasks'],
        params: UnCompleteTaskParamsSchema,
        response: {
          [StatusCodes.NO_CONTENT]: UnCompleteTaskResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      await useCases.unCompleteTask.execute(id, request.userId ?? '')
      return reply.status(StatusCodes.NO_CONTENT).send()
    },
  )
}
