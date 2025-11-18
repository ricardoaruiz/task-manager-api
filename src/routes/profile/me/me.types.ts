import type { MeUseCase } from '@/use-cases/profile/me.use-case'

export type RouteOptions = {
  useCases: {
    me: MeUseCase
  }
}
