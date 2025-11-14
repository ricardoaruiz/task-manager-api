export class TaskAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'Task with title already exists.')
    this.name = 'TaskAlreadyExistsError'
  }
}
