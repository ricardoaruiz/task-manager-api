import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'
import { ArchivedTaskUseCase } from './archive-task.use-case'

describe('ArchivedTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: ArchivedTaskUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    vi.useFakeTimers()
    tasksRepository = new InMemoryTasksRepository()
    sut = new ArchivedTaskUseCase(tasksRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should able to be archive an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
      user_id,
    })

    const dueDate = new Date(2025, 5, 22, 8, 0, 0)
    vi.setSystemTime(dueDate)

    const unArchivedTask = await tasksRepository.findById(task.id, user_id)
    expect(unArchivedTask?.archived_at).toBeNull()

    await sut.execute(task.id, user_id)

    const archivedTask = await tasksRepository.findById(task.id, user_id)
    expect(archivedTask?.archived_at).toEqual(dueDate)
  })

  it('should not be able to archive a non existing task', async () => {
    await expect(() =>
      sut.execute('non-existing-task-id', user_id),
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})
