import type { Task } from '@/@types/domain'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'

export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(taskId: string): Promise<Task> {
    const deletedTask = await this.tasksRepository.delete(taskId)

    if (!deletedTask) {
      throw new TaskNotFoundError()
    }

    return deletedTask
  }
}
