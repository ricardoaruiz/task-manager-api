import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import type { LoginInput, LoginOutput } from '@/@types/domain/auth'
import env from '@/env'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

/**
 * Use case responsible for handling user login.
 * It verifies user credentials and returns user data if valid.
 * Throws InvalidCredentialsError if credentials are invalid.
 * @param userRepository - The user repository to interact with user data.
 * @example
 * const loginUseCase = new LoginUseCase(userRepository)
 * const user = await loginUseCase.execute({ email: 'test@example.com', password: 'password123' })
 * console.log(user) // { id: 'user-id', name: 'Test User', email: 'test@example.com' }
 */
export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(credentials: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(credentials.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // TODO criar servico para gerenciamento de senhas
    const isPasswordValid = bcrypt.compareSync(
      credentials.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    // TODO criar servico para gerenciamento de tokens
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(env.JWT_SECRET))

    const { password: _, ...userWithoutPassword } = user

    return {
      ...userWithoutPassword,
      token,
    }
  }
}
