import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'
import { DeleteTaskUseCase } from './delete-task.use-case'

describe('DeleteTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: DeleteTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('should be able to delete an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'Test Task',
      description: 'This is a test task',
      user_id,
    })

    const deletedTask = await sut.execute(task.id, user_id)

    expect(deletedTask.title).toEqual(task.title)
  })

  it('should not be able to delete an unexisting task', async () => {
    await expect(() =>
      sut.execute('non-existing-id', user_id),
    ).rejects.toThrowError(TaskNotFoundError)
  })
})
