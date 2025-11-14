import type { CreateUserInput, User } from '@/@types/domain/user'
import type { UserRepository } from '../interfaces/user.repository'

export class DrizzleUserRepository implements UserRepository {
  findByEmail(_email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  create(_user: CreateUserInput): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
