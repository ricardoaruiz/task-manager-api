import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
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
        summary: 'Complete a task by ID',
        description:
          'Marks a task as completed in the system using its unique ID.',
        tags: ['Tasks'],
        params: CompleteTaskParamsSchema,
        response: {
          [StatusCodes.NO_CONTENT]: CompleteTaskResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      await useCases.completeTask.execute(id)
      return reply.status(StatusCodes.NO_CONTENT).send()
    },
  )
}
