import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import {
  CompleteTaskUseCase,
  CreateTaskUseCase,
  DeleteTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
} from '../tasks'
import { LoadTaskUseCase } from '../tasks/load-task.use-case'
import type { UseCaseFactory } from './use-case-interface-factory'

export class InMemoryUseCaseFactory implements UseCaseFactory {
  private static instance: InMemoryUseCaseFactory
  private readonly tasksRespoitory: TasksRepository

  private constructor() {
    this.tasksRespoitory = new InMemoryTasksRepository()
  }

  static getInstance(): InMemoryUseCaseFactory {
    if (!InMemoryUseCaseFactory.instance) {
      InMemoryUseCaseFactory.instance = new InMemoryUseCaseFactory()
    }
    return InMemoryUseCaseFactory.instance
  }

  makeListTasksUseCase(): ListTasksUseCase {
    return new ListTasksUseCase(this.tasksRespoitory)
  }

  makeCreateTaskUseCase(): CreateTaskUseCase {
    return new CreateTaskUseCase(this.tasksRespoitory)
  }

  makeDeleteTaskUseCase(): DeleteTaskUseCase {
    return new DeleteTaskUseCase(this.tasksRespoitory)
  }

  makeCompleteTaskUseCase(): CompleteTaskUseCase {
    return new CompleteTaskUseCase(this.tasksRespoitory)
  }

  makeUpdateTaskUseCase(): UpdateTaskUseCase {
    return new UpdateTaskUseCase(this.tasksRespoitory)
  }

  makeLoadTaskUseCase(): LoadTaskUseCase {
    return new LoadTaskUseCase(this.tasksRespoitory)
  }
}
