export type Task = {
  id: string
  title: string
  description: string
  completed_at: Date | null
  archived_at: Date | null
  user_id: string
}

type Filter = Partial<Omit<Task, 'id' | 'completed_at' | 'user_id'>> & {
  status?: 'completed' | 'pending'
}

export type ListTasksInput = {
  user_id: string
  filter?: Filter
  status?: 'completed' | 'pending'
  isArchived?: boolean
  page?: number
  itemsPerPage?: number
}
export type CreateTaskInput = Omit<Task, 'id' | 'completed_at' | 'archived_at'>
export type UpdateTaskInput = Partial<
  Omit<Task, 'id' | 'completed_at' | 'archived_at' | 'user_id'>
> & {
  user_id: string
}
