import type { UpdateTaskInput } from '@/@types/domain'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskNotFoundError } from '../errors/TaskNotFoundError'

export class UpdateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(
    taskId: string,
    taskToBeUpdated: UpdateTaskInput,
  ): Promise<void> {
    const task = await this.tasksRepository.findById(
      taskId,
      taskToBeUpdated.user_id,
    )

    if (!task) {
      throw new TaskNotFoundError()
    }

    await this.tasksRepository.update({
      ...task,
      ...taskToBeUpdated,
    })
  }
}
