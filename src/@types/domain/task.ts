export type Task = {
  id: string
  title: string
  description: string
  completedAt: Date | null
}

export type ListTasksInput = {
  filter?: Partial<Omit<Task, 'id' | 'completedAt'>>
  page?: number
  itemsPerPage?: number
}
export type CreateTaskInput = Omit<Task, 'id' | 'completedAt'>
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'completedAt'>>
