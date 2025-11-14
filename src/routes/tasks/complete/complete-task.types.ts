import type { CompleteTaskUseCase } from '@/use-cases/tasks'

export type CompleteTaskOptions = {
  useCases: {
    completeTask: CompleteTaskUseCase
  }
}
