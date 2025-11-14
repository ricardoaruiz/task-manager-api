import type { LoadTaskUseCase } from '@/use-cases/tasks/load-task.use-case'

export type LoadTaskOptions = {
  useCases: {
    loadTask: LoadTaskUseCase
  }
}
