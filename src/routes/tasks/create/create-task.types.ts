import type { CreateTaskUseCase } from '@/use-cases/tasks/create-task.use-case'

export type RouteOptions = {
  useCases: {
    createTask: CreateTaskUseCase
  }
}
