import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'
import { UpdateTaskUseCase } from './update-task.use-case'

describe('UpdateTaskUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: UpdateTaskUseCase

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(tasksRepository)
  })

  it('should able to be update title of an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
    })

    const originalTask = await tasksRepository.findById(task.id)
    expect(originalTask?.title).toEqual('New Task')
    expect(originalTask?.description).toEqual('Task Description')

    await sut.execute(task.id, {
      title: 'New Task updated',
    })

    const updatedTask = await tasksRepository.findById(task.id)
    expect(updatedTask?.title).toEqual('New Task updated')
    expect(updatedTask?.description).toEqual('Task Description')
  })

  it('should able to be update description of an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
    })

    const originalTask = await tasksRepository.findById(task.id)
    expect(originalTask?.title).toEqual('New Task')
    expect(originalTask?.description).toEqual('Task Description')

    await sut.execute(task.id, {
      description: 'Task Description updated',
    })

    const updatedTask = await tasksRepository.findById(task.id)
    expect(updatedTask?.title).toEqual('New Task')
    expect(updatedTask?.description).toEqual('Task Description updated')
  })

  it('should able to be update title and description of an existing task', async () => {
    const task = await tasksRepository.create({
      title: 'New Task',
      description: 'Task Description',
    })

    const originalTask = await tasksRepository.findById(task.id)
    expect(originalTask?.title).toEqual('New Task')
    expect(originalTask?.description).toEqual('Task Description')

    await sut.execute(task.id, {
      title: 'New Task updated',
      description: 'Task Description updated',
    })

    const updatedTask = await tasksRepository.findById(task.id)
    expect(updatedTask?.title).toEqual('New Task updated')
    expect(updatedTask?.description).toEqual('Task Description updated')
  })

  it('should not be able to complete a non existing task', async () => {
    await expect(() =>
      sut.execute('non-existing-task-id', {
        title: 'New Task updated',
      }),
    ).rejects.toBeInstanceOf(TaskNotFoundError)
  })
})
