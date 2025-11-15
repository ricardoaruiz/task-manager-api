import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'
import { CompleteTaskUseCase } from './complete-task.use-case'

describe('CompleteTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: CompleteTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    vi.useFakeTimers()
    tasksRepository = new InMemoryTasksRepository()
    sut = new CompleteTaskUseCase(tasksRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should able to be complete an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
      user_id,
    })

    const dueDate = new Date(2025, 5, 22, 8, 0, 0)
    vi.setSystemTime(dueDate)

    const uncompletedTask = await tasksRepository.findById(task.id, user_id)
    expect(uncompletedTask?.completed_at).toBeNull()

    await sut.execute(task.id, user_id)

    const completedTask = await tasksRepository.findById(task.id, user_id)
    expect(completedTask?.completed_at).toEqual(dueDate)
  })

  it('should not be able to complete a non existing task', async () => {
    await expect(() =>
      sut.execute('non-existing-task-id', user_id),
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})
