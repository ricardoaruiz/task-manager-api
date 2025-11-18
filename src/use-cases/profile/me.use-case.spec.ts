import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { UserNotFoundError } from '../errors/UserNotFoundError'
import { MeUseCase } from './me.use-case'

describe('Me Use Case', () => {
  let userRepository: UserRepository
  let sut: MeUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new MeUseCase(userRepository)
  })

  it('should be able to get the current user profile', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const resp = await sut.execute({ email: 'john.doe@example.com' })

    expect(resp).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    )
  })

  it('should not be able to get the current user profile', async () => {
    await expect(
      sut.execute({ email: 'john.doe@example.com' }),
    ).rejects.toThrow(UserNotFoundError)
  })
})
