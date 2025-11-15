import type { LoginUseCase } from '@/use-cases/auth/login.use-case'

export type RouteOptions = {
  useCases: {
    login: LoginUseCase
  }
}
