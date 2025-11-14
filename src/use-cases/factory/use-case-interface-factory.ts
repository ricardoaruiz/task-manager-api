import type { LoginUseCase } from '../auth/login.use-case'
import type { CompleteTaskUseCase, UpdateTaskUseCase } from '../tasks'
import type { CreateTaskUseCase } from '../tasks/create-task.use-case'
import type { DeleteTaskUseCase } from '../tasks/delete-task.use-case'
import type { ListTasksUseCase } from '../tasks/list-tasks.use-case'
import type { LoadTaskUseCase } from '../tasks/load-task.use-case'

export interface UseCaseFactory {
  // Auth
  makeLoginUseCase(): LoginUseCase

  // Tasks
  makeListTasksUseCase(): ListTasksUseCase
  makeCreateTaskUseCase(): CreateTaskUseCase
  makeDeleteTaskUseCase(): DeleteTaskUseCase
  makeCompleteTaskUseCase(): CompleteTaskUseCase
  makeUpdateTaskUseCase(): UpdateTaskUseCase
  makeLoadTaskUseCase(): LoadTaskUseCase
}
