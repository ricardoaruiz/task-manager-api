import type { FastifyInstance } from 'fastify'
import { getUseCaseFactory } from '@/use-cases/factory'
import { meRoute } from './me'

export function profileRoutes(app: FastifyInstance) {
  const meUseCase = getUseCaseFactory().makeMeUseCase()

  meRoute(app, {
    useCases: {
      me: meUseCase,
    },
  })
}
