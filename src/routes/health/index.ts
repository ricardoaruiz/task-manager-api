import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { checkRoute } from './check'

/**
 * Health routes
 * @param app Fastify instance
 */
export const healthRoutes: FastifyPluginAsyncZod = async (
  app: FastifyInstance,
  options,
) => {
  checkRoute(app, {
    ...options,
  })
}
