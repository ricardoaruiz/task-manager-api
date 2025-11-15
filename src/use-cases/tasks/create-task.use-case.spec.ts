import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskAlreadyExistsError } from '../errors/TaskAlreadyExistsError'
import { CreateTaskUseCase } from './create-task.use-case'

describe('CreateTaskUseCase', () => {
  let tasksRepository: TasksRepository
  let sut: CreateTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('should create a new task', async () => {
    const createdTask = await sut.execute({
      data: {
        title: 'New Task',
        description: 'Task description',
        user_id,
      },
    })

    expect(createdTask).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'New Task',
        description: 'Task description',
      }),
    )
  })

  it('should not be able to create a new task with same title that an existing one', async () => {
    const createdTask = await sut.execute({
      data: {
        title: 'New Task',
        description: 'Task description',
        user_id,
      },
    })

    expect(createdTask).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'New Task',
        description: 'Task description',
        user_id,
      }),
    )

    await expect(() =>
      sut.execute({
        data: {
          title: 'New Task',
          description: 'Task description',
          user_id,
        },
      }),
    ).rejects.toThrowError(TaskAlreadyExistsError)
  })
})
