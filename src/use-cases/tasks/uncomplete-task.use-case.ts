import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'

export class UnCompleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(taskId: string, userId: string): Promise<void> {
    const task = await this.tasksRepository.findById(taskId, userId)

    if (!task) {
      throw new TaskNotFoundError()
    }

    await this.tasksRepository.update({
      ...task,
      completed_at: null,
    })
  }
}
