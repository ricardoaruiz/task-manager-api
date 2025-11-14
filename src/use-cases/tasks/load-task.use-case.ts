import type { TasksRepository } from '@/repositories/interfaces/task.repository'

export class LoadTaskUseCase {
  constructor(private readonly taskRepository: TasksRepository) {}

  async execute(id: string) {
    const task = await this.taskRepository.findById(id)
    return task
  }
}
