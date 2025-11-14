import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
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
      schema: {
        summary: 'List all tasks',
        description: 'Retrieve a list of all tasks',
        tags: ['Tasks'],
        querystring: ListTaskQueryStringSchema,
        response: {
          [StatusCodes.OK]: ListTaskRouteResponseSuccessSchema,
        },
      },
    },
    async (_request, reply) => {
      const { title, description, page, itemsPerPage } = _request.query

      const tasks = await useCases.listTasks.execute({
        ...(!!title || !!description
          ? {
              filter: {
                ..._request.query,
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
