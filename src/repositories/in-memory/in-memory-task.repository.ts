import type { CreateTaskInput, ListTasksInput, Task } from '@/@types/domain'
import type { TasksRepository } from '../interfaces/task.repository'

export class InMemoryTasksRepository implements TasksRepository {
  private items: Task[] = []

  list({
    user_id,
    filter,
    page,
    itemsPerPage = 10,
  }: ListTasksInput): Promise<Task[]> {
    let filteredItems: Task[] = this.items.filter(
      (item) => item.user_id === user_id,
    )

    if (filter?.title) {
      filteredItems = this.items.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(
            filter.title?.toLocaleLowerCase() ?? item.title.toLocaleLowerCase(),
          ),
      )
    }

    if (filter?.description) {
      filteredItems = this.items.filter((item) =>
        item.description
          .toLocaleLowerCase()
          .includes(
            filter.description?.toLocaleLowerCase() ??
              item.description.toLocaleLowerCase(),
          ),
      )
    }

    if (page !== undefined) {
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return Promise.resolve(filteredItems.slice(startIndex, endIndex))
    }

    return Promise.resolve(filteredItems)
  }

  findById(taskId: string, userId: string): Promise<Task | null> {
    return Promise.resolve(
      this.items.find(
        (item) => item.id === taskId && item.user_id === userId,
      ) || null,
    )
  }

  findByTitle(title: string, userId: string): Promise<Task | null> {
    return Promise.resolve(
      this.items.find(
        (item) =>
          item.title.toLocaleLowerCase() === title.toLocaleLowerCase() &&
          item.user_id === userId,
      ) || null,
    )
  }

  create({ title, description, user_id }: CreateTaskInput): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed_at: null,
      user_id,
    }

    this.items.push(task)

    return Promise.resolve(task)
  }

  async update(taskToBeUpdated: Task): Promise<Task | null> {
    const originalTask = await this.findById(
      taskToBeUpdated.id,
      taskToBeUpdated.user_id,
    )

    if (!originalTask) {
      return null
    }

    const updatedTask = { ...originalTask, ...taskToBeUpdated }

    this.items = this.items.map((item) =>
      item.id === updatedTask.id ? updatedTask : item,
    )

    return updatedTask
  }

  async delete(taskId: string, userId: string): Promise<Task | null> {
    const taskToBeDeleted = await this.findById(taskId, userId)

    if (!taskToBeDeleted) {
      return null
    }

    this.items = this.items.filter((item) => item.id !== taskId)

    return taskToBeDeleted
  }
}
