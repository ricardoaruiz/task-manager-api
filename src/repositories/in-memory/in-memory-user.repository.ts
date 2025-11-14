import { uuidv7 } from 'uuidv7'
import type { CreateUserInput, User } from '@/@types/domain/user'
import type { UserRepository } from '../interfaces/user.repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) || null,
    )
  }

  create(user: CreateUserInput): Promise<User> {
    const newUser = {
      id: uuidv7(),
      ...user,
    }

    this.users.push(newUser)

    return Promise.resolve(newUser)
  }
}
