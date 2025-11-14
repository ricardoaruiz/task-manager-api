import type { UpdateTaskUseCase } from '@/use-cases/tasks'

export type UpdateTaskOptions = {
  useCases: {
    updateTask: UpdateTaskUseCase
  }
}
