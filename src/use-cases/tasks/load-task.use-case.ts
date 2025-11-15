import type { TasksRepository } from '@/repositories/interfaces/task.repository'

export class LoadTaskUseCase {
  constructor(private readonly taskRepository: TasksRepository) {}

  async execute(id: string, userId: string) {
    const task = await this.taskRepository.findById(id, userId)
    return task
  }
}
