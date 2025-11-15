import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import {
  CreateTaskBodySchema,
  CreateTaskResponseSuccessSchema,
} from './create-task.schemas'
import type { RouteOptions } from './create-task.types'

export const createTaskRoute: FastifyPluginAsyncZod<RouteOptions> = async (
  app,
  options,
) => {
  const { useCases } = options

  app.post(
    '/',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'Create a task',
        description:
          'Creates a new task with the given title and optional description.',
        tags: ['Tasks'],
        body: CreateTaskBodySchema,
        response: {
          [StatusCodes.CREATED]: CreateTaskResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body

      const createdTask = await useCases.createTask.execute({
        data: { title, description, user_id: request.userId ?? '' },
      })

      return reply.status(StatusCodes.CREATED).send(createdTask)
    },
  )
}
