import type { LoginInput, LoginOutput } from '@/@types/domain/auth'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import type { HashService, TokenService } from '@/services'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

/**
 * Use case responsible for handling user login.
 * It verifies user credentials and returns user data if valid.
 * Throws InvalidCredentialsError if credentials are invalid.
 * @param userRepository - The user repository to interact with user data.
 * @param hashService - The hash service to verify passwords.
 * @param tokenService - The token service to generate authentication tokens.
 */
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(credentials: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(credentials.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    if (
      !this.hashService.compare({
        plainText: credentials.password,
        hashedText: user.password,
      })
    ) {
      throw new InvalidCredentialsError()
    }

    const token = await this.tokenService.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    const { password: _, ...userWithoutPassword } = user

    return {
      ...userWithoutPassword,
      token,
    }
  }
}
