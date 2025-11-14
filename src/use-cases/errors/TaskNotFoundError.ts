export class TaskNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Task not found.')
    this.name = 'TaskNotFoundError'
  }
}
