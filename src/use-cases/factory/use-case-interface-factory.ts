import type { LoginUseCase } from '../auth/login.use-case'
import type { SignupUseCase } from '../auth/signup.use-case'
import type { MeUseCase } from '../profile/me.use-case'
import type { CompleteTaskUseCase, UpdateTaskUseCase } from '../tasks'
import type { ArchivedTaskUseCase } from '../tasks/archive-task.use-case'
import type { CreateTaskUseCase } from '../tasks/create-task.use-case'
import type { DeleteTaskUseCase } from '../tasks/delete-task.use-case'
import type { ListTasksUseCase } from '../tasks/list-tasks.use-case'
import type { LoadTaskUseCase } from '../tasks/load-task.use-case'
import type { UnCompleteTaskUseCase } from '../tasks/uncomplete-task.use-case'

export interface UseCaseFactory {
  // Auth
  makeSignupUseCase(): SignupUseCase
  makeLoginUseCase(): LoginUseCase

  // Profile
  makeMeUseCase(): MeUseCase

  // Tasks
  makeListTasksUseCase(): ListTasksUseCase
  makeCreateTaskUseCase(): CreateTaskUseCase
  makeDeleteTaskUseCase(): DeleteTaskUseCase
  makeCompleteTaskUseCase(): CompleteTaskUseCase
  makeUnCompleteTaskUseCase(): UnCompleteTaskUseCase
  makeUpdateTaskUseCase(): UpdateTaskUseCase
  makeLoadTaskUseCase(): LoadTaskUseCase
  makeArchiveTaskUseCase(): ArchivedTaskUseCase
}
