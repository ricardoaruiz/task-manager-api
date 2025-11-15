import type { ListTasksInput, Task } from '@/@types/domain'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'

export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(input: ListTasksInput): Promise<Task[]> {
    const tasks = await this.tasksRepository.list(input)
    return tasks
  }
}
