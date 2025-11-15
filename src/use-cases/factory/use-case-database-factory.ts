import { DrizzleTaskRepository } from '@/repositories/drizzle/drizzle-task.repository'
import { DrizzleUserRepository } from '@/repositories/drizzle/drizzle-user.repository'
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

export class DatabaseUseCaseFactory implements UseCaseFactory {
  private static instance: DatabaseUseCaseFactory

  private readonly tasksRespoitory: TasksRepository
  private readonly userRepository: UserRepository

  private constructor() {
    this.tasksRespoitory = new DrizzleTaskRepository()
    this.userRepository = new DrizzleUserRepository()
  }
  static getInstance(): DatabaseUseCaseFactory {
    if (!DatabaseUseCaseFactory.instance) {
      DatabaseUseCaseFactory.instance = new DatabaseUseCaseFactory()
    }
    return DatabaseUseCaseFactory.instance
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
