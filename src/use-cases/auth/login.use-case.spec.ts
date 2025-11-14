import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'
import { LoginUseCase } from './login.use-case'

describe('LoginUseCase', () => {
  let userRespository: UserRepository
  let sut: LoginUseCase

  beforeEach(() => {
    userRespository = new InMemoryUserRepository()
    sut = new LoginUseCase(userRespository)
  })

  it('should able to login with an existing user and valid credentials', async () => {
    const user = await userRespository.create({
      name: 'Test User',
      email: 'test@example.com',
      password: bcrypt.hashSync('password123', 10),
    })

    const result = await sut.execute({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(result).toEqual(
      expect.objectContaining({
        id: user.id,
        name: 'Test User',
        email: 'test@example.com',
      }),
    )
  })

  it('should not be able to login with a wrong password', async () => {
    await userRespository.create({
      name: 'Test User',
      email: 'test@example.com',
      password: bcrypt.hashSync('password123', 10),
    })

    await expect(() =>
      sut.execute({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('should not be able to login with a wrong email', async () => {
    await userRespository.create({
      name: 'Test User',
      email: 'test@example.com',
      password: bcrypt.hashSync('password123', 10),
    })

    await expect(() =>
      sut.execute({
        email: 'invalid@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})
