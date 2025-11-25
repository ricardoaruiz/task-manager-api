import type { ArchivedTaskUseCase } from '@/use-cases/tasks/archive-task.use-case'

export type ArchiveTaskOptions = {
  useCases: {
    archivedTask: ArchivedTaskUseCase
  }
}
