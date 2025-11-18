import type { MeInput, MeOutput } from '@/@types/domain/user'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { UserNotFoundError } from '../errors/UserNotFoundError'

export class MeUseCase {
  constructor(private readonly userRepoitory: UserRepository) {}

  async execute({ email }: MeInput): Promise<MeOutput> {
    const user = await this.userRepoitory.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
