import type { SignupUseCase } from '@/use-cases/auth/signup.use-case'

export type RouteOptions = {
  useCases: {
    signup: SignupUseCase
  }
}
