import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { ListTasksUseCase } from './list-tasks.use-case'

describe('ListTasksUseCase', () => {
  let tasksRepository: InMemoryTasksRepository
  let sut: ListTasksUseCase
  const user_id = 'user-1'

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ListTasksUseCase(tasksRepository)
  })

  it('should be able to get a empty tasks list', async () => {
    const tasks = await sut.execute({ user_id })
    expect(tasks).toHaveLength(0)
  })

  it('should be able to get a tasks list with tasks', async () => {
    for (let i = 1; i <= 2; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({ user_id })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a task list with completed tasks', async () => {
    for (let i = 1; i <= 4; i++) {
      const task = await tasksRepository.create({
        title: `Task ${i}`,
        description: `Description ${i}`,
        user_id,
      })

      if (i % 2 === 0) {
        await tasksRepository.update({
          ...task,
          completed_at: new Date(),
        })
      }
    }

    const tasks = await sut.execute({
      user_id,
      filter: { status: 'completed' },
    })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a task list with pending tasks', async () => {
    for (let i = 1; i <= 4; i++) {
      const task = await tasksRepository.create({
        title: `Task ${i}`,
        description: `Description ${i}`,
        user_id,
      })

      if (i % 2 === 0) {
        await tasksRepository.update({
          ...task,
          completed_at: new Date(),
        })
      }
    }

    const tasks = await sut.execute({
      user_id,
      filter: { status: 'pending' },
    })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a tasks list with title filter', async () => {
    for (let i = 1; i <= 4; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({ user_id, filter: { title: 'Task Odd' } })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a tasks list with title filter and pagination', async () => {
    for (let i = 1; i <= 20; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({
      user_id,
      filter: { title: 'Task Odd' },
      page: 1,
      itemsPerPage: 5,
    })
    expect(tasks).toHaveLength(5)
    expect(tasks[0].title).toBe('Task Odd 1')
    expect(tasks[4].title).toBe('Task Odd 9')
  })

  it('should be able to get a tasks list with description filter', async () => {
    for (let i = 1; i <= 4; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({
      user_id,
      filter: { description: 'Description Odd' },
    })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a tasks list with description filter and pagination', async () => {
    for (let i = 1; i <= 20; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({
      user_id,
      filter: { description: 'Description Odd' },
      page: 1,
      itemsPerPage: 5,
    })
    expect(tasks).toHaveLength(5)
    expect(tasks[0].description).toBe('Description Odd 1')
    expect(tasks[4].description).toBe('Description Odd 9')
  })

  it('should be able to get a tasks list with title and description filter', async () => {
    for (let i = 1; i <= 4; i++) {
      await tasksRepository.create({
        title: `Task ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        description: `Description ${i % 2 === 0 ? 'Even' : 'Odd'} ${i}`,
        user_id,
      })
    }

    const tasks = await sut.execute({
      user_id,
      filter: { title: 'Task Odd', description: 'Description Odd' },
    })
    expect(tasks).toHaveLength(2)
  })

  it('should be able to get a paginated tasks list', async () => {
    for (let i = 1; i <= 25; i++) {
      await tasksRepository.create({
        title: `Task ${i}`,
        description: `Description ${i}`,
        user_id,
      })
    }

    const firstPageTasks = await sut.execute({ user_id, page: 1 })
    expect(firstPageTasks).toHaveLength(10)
    expect(firstPageTasks[0].title).toBe('Task 1')
    expect(firstPageTasks[9].title).toBe('Task 10')

    const thirdPageTasks = await sut.execute({ user_id, page: 3 })
    expect(thirdPageTasks).toHaveLength(5)
    expect(thirdPageTasks[0].title).toBe('Task 21')
    expect(thirdPageTasks[4].title).toBe('Task 25')
  })

  it('should be able to get a paginated tasks list with itemsPerPage informed', async () => {
    for (let i = 1; i <= 25; i++) {
      await tasksRepository.create({
        title: `Task ${i}`,
        description: `Description ${i}`,
        user_id,
      })
    }

    const firstPageTasks = await sut.execute({
      user_id,
      page: 1,
      itemsPerPage: 5,
    })
    expect(firstPageTasks).toHaveLength(5)
    expect(firstPageTasks[0].title).toBe('Task 1')
    expect(firstPageTasks[4].title).toBe('Task 5')

    const thirdPageTasks = await sut.execute({
      user_id,
      page: 3,
      itemsPerPage: 5,
    })
    expect(thirdPageTasks).toHaveLength(5)
    expect(thirdPageTasks[0].title).toBe('Task 11')
    expect(thirdPageTasks[4].title).toBe('Task 15')
  })
})
