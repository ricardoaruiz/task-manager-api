import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  LoadTaskParamsSchema,
  LoadTaskResponseNotFoundSchema,
  LoadTaskRsponseSuccessSchema,
} from './load-task.schemas'
import type { LoadTaskOptions } from './load-task.types'

export const loadTaskRoute: FastifyPluginAsyncZod<LoadTaskOptions> = async (
  app,
  options,
) => {
  const { useCases } = options

  app.get(
    '/:id',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Load a task',
        description: 'Loads a task from the system using its unique ID.',
        tags: ['Tasks'],
        params: LoadTaskParamsSchema,
        response: {
          [StatusCodes.OK]: LoadTaskRsponseSuccessSchema,
          [StatusCodes.NOT_FOUND]: LoadTaskResponseNotFoundSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const loadedTask = await useCases.loadTask.execute(
        id,
        request.userId ?? '',
      )

      if (!loadedTask) {
        return reply.status(StatusCodes.NOT_FOUND).send()
      }

      return reply.status(StatusCodes.OK).send(loadedTask)
    },
  )
}
