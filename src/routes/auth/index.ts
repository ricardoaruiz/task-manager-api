import type { FastifyInstance } from 'fastify'
import { getUseCaseFactory } from '@/use-cases/factory'
import { loginRoute } from './login'
import { signupRoute } from './signup/signup.route'

export const authRoutes = (app: FastifyInstance) => {
  const loginUseCase = getUseCaseFactory().makeLoginUseCase()
  const signupUseCase = getUseCaseFactory().makeSignupUseCase()

  signupRoute(app, {
    useCases: { signup: signupUseCase },
  })

  loginRoute(app, {
    useCases: { login: loginUseCase },
  })
}
