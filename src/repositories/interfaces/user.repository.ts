import type { CreateUserInput, User } from '@/@types/domain/user'

export interface UserRepository {
  /**
   * Find a user by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findByEmail(email: string): Promise<User | null>

  /**
   * Create a new user.
   *
   * @param user - The user data to create.
   * @returns A promise that resolves to the created user.
   */
  create(user: CreateUserInput): Promise<User>
}
