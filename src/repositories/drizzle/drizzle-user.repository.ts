import { eq } from 'drizzle-orm'
import type { CreateUserInput, User } from '@/@types/domain/user'
import { userTable } from '@/db/schema/user-table'
import db from '@/lib/drizzle'
import type { UserRepository } from '../interfaces/user.repository'

export class DrizzleUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1)

    return user[0] ?? null
  }

  async create(user: CreateUserInput): Promise<User> {
    const createdUser = await db.insert(userTable).values(user).returning()
    return createdUser[0]
  }
}
