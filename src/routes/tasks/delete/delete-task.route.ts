import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  DeleteTaskParamsSchema,
  DeleteTaskRsponseSuccessSchema,
} from './delete-task.schemas'
import type { DeleteTaskOptions } from './delete-task.types'

export const deleteTaskRoute: FastifyPluginAsyncZod<DeleteTaskOptions> = async (
  app,
  options,
) => {
  const { useCases } = options

  app.delete(
    '/:id',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Delete a task',
        description: 'Deletes a task from the system using its unique ID.',
        tags: ['Tasks'],
        params: DeleteTaskParamsSchema,
        response: {
          [StatusCodes.OK]: DeleteTaskRsponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const deletedTask = await useCases.deleteTask.execute(
        id,
        request.userId ?? '',
      )

      return reply.status(StatusCodes.OK).send(deletedTask)
    },
  )
}
