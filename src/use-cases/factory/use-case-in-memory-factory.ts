import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-task.repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository'
import type { TasksRepository } from '@/repositories/interfaces/task.repository'
import type { UserRepository } from '@/repositories/interfaces/user.repository'
import { LoginUseCase } from '../auth/login.use-case'
import { SignupUseCase } from '../auth/signup.use-case'
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
  private readonly userRepository: UserRepository

  private constructor() {
    this.tasksRespoitory = new InMemoryTasksRepository()
    this.userRepository = new InMemoryUserRepository()
  }

  static getInstance(): InMemoryUseCaseFactory {
    if (!InMemoryUseCaseFactory.instance) {
      InMemoryUseCaseFactory.instance = new InMemoryUseCaseFactory()
    }
    return InMemoryUseCaseFactory.instance
  }

  makeSignupUseCase(): SignupUseCase {
    return new SignupUseCase(this.userRepository)
  }

  makeLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.userRepository)
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
