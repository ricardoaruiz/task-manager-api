import bcrypt from 'bcryptjs'
import type { CreateUserInput, User } from '@/@types/domain/user'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'

/**
 * Use case for signing up a new user.
 * It checks if a user with the given email already exists.
 * If not, it creates a new user in the repository.
 */
export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserInput): Promise<User> {
    const checkExistingUser = await this.userRepository.findByEmail(email)

    if (checkExistingUser) {
      throw new UserAlreadyExistsError()
    }

    const newUser = await this.userRepository.create({
      name,
      email,
      // TODO mudar para um servico de gerenciamento de senhas
      password: bcrypt.hashSync(password, 10),
    })
    return newUser
  }
}
