import type { DeleteTaskUseCase } from '@/use-cases/tasks'

export type DeleteTaskOptions = {
  useCases: {
    deleteTask: DeleteTaskUseCase
  }
}
