import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'
import { SignupUseCase } from './signup.use-case'

describe('Signup Use Case', () => {
  let userRepository: UserRepository
  let sut: SignupUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new SignupUseCase(userRepository)
  })

  it('shoud be able to create a new user', async () => {
    await expect(
      sut.execute({
        email: 'email@email.com',
        name: 'User Name',
        password: 'password123',
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'email@email.com',
        name: 'User Name',
      }),
    )
  })

  it('shoud not be able to create a new user with an existing email', async () => {
    await sut.execute({
      email: 'email@email.com',
      name: 'User Name',
      password: 'password123',
    })

    await expect(
      sut.execute({
        email: 'email@email.com',
        name: 'User Name',
        password: 'password123',
      }),
    ).rejects.toThrow(UserAlreadyExistsError)
  })
})
