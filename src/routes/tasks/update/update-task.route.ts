import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import {
  UpdateTaskBodySchema,
  UpdateTaskParamsSchema,
  UpdateTaskResponseSuccessSchema,
} from './update-task.schemas'
import type { UpdateTaskOptions } from './update-task.types'

export const updateTaskRoute: FastifyPluginAsyncZod<UpdateTaskOptions> = async (
  app,
  options,
) => {
  const { useCases } = options

  app.put(
    '/:id',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Update a task by ID',
        description:
          'Updates the details of a task in the system using its unique ID.',
        tags: ['Tasks'],
        params: UpdateTaskParamsSchema,
        body: UpdateTaskBodySchema,
        response: {
          [StatusCodes.NO_CONTENT]: UpdateTaskResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { title, description } = request.body
      await useCases.updateTask.execute(id, { title, description })
      return reply.status(StatusCodes.NO_CONTENT).send()
    },
  )
}
