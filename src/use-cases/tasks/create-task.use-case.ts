import type { CreateTaskInput, Task } from '@/@types/domain'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import { TaskAlreadyExistsError } from '../errors/TaskAlreadyExistsError'

type CreateTaskUseCaseRequest = {
  data: CreateTaskInput
}

/**
 * Use case for creating a new task.
 * @param tasksRepository - The repository for managing tasks.
 * @returns A promise that resolves when the task is created.
 */
export class CreateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ data }: CreateTaskUseCaseRequest): Promise<Task> {
    const existingTask = await this.tasksRepository.findByTitle(
      data.title,
      data.user_id,
    )

    if (existingTask) {
      throw new TaskAlreadyExistsError('Task with this title already exists.')
    }

    return this.tasksRepository.create(data)
  }
}
