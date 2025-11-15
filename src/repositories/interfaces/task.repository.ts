import type {
  CreateTaskInput,
  ListTasksInput,
  Task,
} from '@/@types/domain/task'

/**
 * Interface for the Tasks Repository.
 * Provides methods to interact with task data.
 * @interface TasksRepository
 */
export type TasksRepository = {
  /**
   * Lists all tasks.
   * @param params - The parameters for listing tasks, including filters and pagination.
   * @return A promise that resolves to an array of tasks.
   */
  list(params: ListTasksInput): Promise<Task[]>

  /**
   * Finds a task by its ID.
   * @param taskId - The ID of the task to find.
   * @return A promise that resolves to the task if found, or null if not found.
   */
  findById(taskId: string, userId: string): Promise<Task | null>

  /**
   * Finds a task by its Title
   * @param title - The title of the task to find.
   * @return A promise that resolves to the task if found, or null if not found.
   */
  findByTitle(title: string, userId: string): Promise<Task | null>

  /**
   * Creates a new task.
   * @param data - The data for the new task.
   * @return A promise that resolves to the created task.
   */
  create(data: CreateTaskInput): Promise<Task>

  /**
   * Updates an existing task.
   * @param task - The task to update.
   * @return A promise that resolves to the updated task if found, or null if not found.
   */
  update(task: Task): Promise<Task | null>

  /**
   * Deletes a task by its ID.
   * @param taskId - The ID of the task to delete.
   * @return A promise that resolves to the deleted task if found, or null if not found.
   */
  delete(taskId: string, userId: string): Promise<Task | null>
}
