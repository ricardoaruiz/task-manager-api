import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { LoadTaskUseCase } from './load-task.use-case'

describe('Load Task Use Case', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: LoadTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new LoadTaskUseCase(tasksRepository)
  })

  it('should load a task by ID', async () => {
    const createdTask = await tasksRepository.create({
      title: 'Test Task',
      description: 'This is a test task',
      user_id,
    })

    const loadedTask = await sut.execute(createdTask.id, user_id)
    expect(loadedTask).toEqual(
      expect.objectContaining({
        id: createdTask.id,
        title: createdTask.title,
        description: createdTask.description,
      }),
    )
  })

  it('should return null if task does not exist', async () => {
    const loadedTask = await sut.execute('non-existing-id', user_id)

    expect(loadedTask).toBeNull()
  })
})
