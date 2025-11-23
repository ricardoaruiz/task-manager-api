import type { UnCompleteTaskUseCase } from '@/use-cases/tasks/uncomplete-task.use-case'

export type UnCompleteTaskOptions = {
  useCases: {
    unCompleteTask: UnCompleteTaskUseCase
  }
}
