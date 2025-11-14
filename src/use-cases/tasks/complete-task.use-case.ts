import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'

export class CompleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(taskId: string): Promise<void> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new TaskNotFoundError()
    }

    await this.tasksRepository.update({
      ...task,
      completedAt: new Date(),
    })
  }
}
