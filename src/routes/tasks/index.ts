import type { FastifyInstance } from 'fastify'
import { getUseCaseFactory } from '@/use-cases/factory'
import { completeTaskRoute } from './complete'
import { createTaskRoute } from './create'
import { deleteTaskRoute } from './delete'
import { listTasksRoute } from './list'
import { loadTaskRoute } from './load'
import { uncompleteTaskRoute } from './uncomplete'
import { updateTaskRoute } from './update'
import { archiveTaskRoute } from './archive/archive-task.route'

export const tasksRoutes = async (app: FastifyInstance) => {
  const listTasksUseCase = getUseCaseFactory().makeListTasksUseCase()
  const createTaskUseCase = getUseCaseFactory().makeCreateTaskUseCase()
  const deleteTaskUseCase = getUseCaseFactory().makeDeleteTaskUseCase()
  const completeTaskUseCase = getUseCaseFactory().makeCompleteTaskUseCase()
  const unCompleteTaskUseCase = getUseCaseFactory().makeUnCompleteTaskUseCase()
  const updateTaskUseCase = getUseCaseFactory().makeUpdateTaskUseCase()
  const loadTaskUseCase = getUseCaseFactory().makeLoadTaskUseCase()
  const archiveTaskUseCase = getUseCaseFactory().makeArchiveTaskUseCase()

  loadTaskRoute(app, { useCases: { loadTask: loadTaskUseCase } })
  listTasksRoute(app, { useCases: { listTasks: listTasksUseCase } })
  createTaskRoute(app, {
    useCases: { createTask: createTaskUseCase },
  })
  updateTaskRoute(app, {
    useCases: { updateTask: updateTaskUseCase },
  })
  completeTaskRoute(app, {
    useCases: { completeTask: completeTaskUseCase },
  })
  uncompleteTaskRoute(app, {
    useCases: { unCompleteTask: unCompleteTaskUseCase },
  })
  deleteTaskRoute(app, {
    useCases: { deleteTask: deleteTaskUseCase },
  })
  archiveTaskRoute(app, {
    useCases: { archivedTask: archiveTaskUseCase },
  })
}
