import type { ListTasksUseCase } from '@/use-cases/tasks/list-tasks.use-case'

export type RouteOptions = {
  useCases: {
    listTasks: ListTasksUseCase
  }
}
