import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'
import { UnCompleteTaskUseCase } from './uncomplete-task.use-case'

describe('UnCompleteTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: UnCompleteTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    vi.useFakeTimers()
    tasksRepository = new InMemoryTasksRepository()
    sut = new UnCompleteTaskUseCase(tasksRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should able to be uncomplete an existing task', async () => {
    const dueDate = new Date(2025, 5, 22, 8, 0, 0)
    vi.setSystemTime(dueDate)

    const tempTask = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
      user_id,
    })

    const completedTask = await tasksRepository.update({
      ...tempTask,
      completed_at: new Date(),
    })

    if (!completedTask) {
      throw new Error('Task was not created properly')
    }

    expect(completedTask?.completed_at).toEqual(dueDate)

    await sut.execute(completedTask.id, user_id)

    const uncompletedTask = await tasksRepository.findById(
      completedTask.id,
      user_id,
    )
    expect(uncompletedTask?.completed_at).toBeNull()
  })

  it('should not be able to uncomplete a non existing task', async () => {
    await expect(() =>
      sut.execute('non-existing-task-id', user_id),
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})
