import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { checkAuthMiddleware } from '@/middlewares/check-auth.middleware'
import { CommonUnauthorizedResponseSchema } from '@/routes/routes.schame'
import {
  ListTaskQueryStringSchema,
  ListTaskRouteResponseSuccessSchema,
} from './list-tasks.schemas'
import type { RouteOptions } from './list-tasks.types'

export const listTasksRoute: FastifyPluginAsyncZod<RouteOptions> = async (
  app,
  options,
) => {
  const { useCases } = options

  app.get(
    '/',
    {
      preHandler: [checkAuthMiddleware],
      schema: {
        summary: 'List tasks',
        description: 'Retrieve a list of all tasks',
        tags: ['Tasks'],
        querystring: ListTaskQueryStringSchema,
        response: {
          [StatusCodes.OK]: ListTaskRouteResponseSuccessSchema,
          [StatusCodes.UNAUTHORIZED]: CommonUnauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { title, description, page, itemsPerPage } = request.query

      const tasks = await useCases.listTasks.execute({
        user_id: request.userId ?? '',
        ...(!!title || !!description
          ? {
              filter: {
                ...request.query,
              },
            }
          : {}),
        ...(page ? { page } : {}),
        ...(itemsPerPage ? { itemsPerPage } : {}),
      })

      return reply.status(StatusCodes.OK).send({ data: tasks })
    },
  )
}
