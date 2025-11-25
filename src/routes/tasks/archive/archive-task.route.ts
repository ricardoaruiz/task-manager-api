import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  ArchiveTaskParamsSchema,
  ArchiveTaskResponseSuccessSchema,
} from './archive-task.schemas'
import type { ArchiveTaskOptions } from './archive-task.types'

export const archiveTaskRoute: FastifyPluginAsyncZod<
  ArchiveTaskOptions
> = async (app, options) => {
  const { useCases } = options

  app.patch(
    '/:id/archive',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Archive a task',
        description:
          'Marks a task as archived in the system using its unique ID.',
        tags: ['Tasks'],
        params: ArchiveTaskParamsSchema,
        response: {
          [StatusCodes.NO_CONTENT]: ArchiveTaskResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      await useCases.archivedTask.execute(id, request.userId ?? '')
      return reply.status(StatusCodes.NO_CONTENT).send()
    },
  )
}
