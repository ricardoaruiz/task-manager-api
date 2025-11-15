import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
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
        summary: 'Delete a task by ID',
        description: 'Deletes a task from the system using its unique ID.',
        tags: ['Tasks'],
        params: DeleteTaskParamsSchema,
        response: {
          [StatusCodes.OK]: DeleteTaskRsponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const deletedTask = await useCases.deleteTask.execute(id)

      return reply.status(StatusCodes.OK).send(deletedTask)
    },
  )
}
