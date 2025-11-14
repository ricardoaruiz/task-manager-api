import { and, eq, ilike } from 'drizzle-orm'
import type { CreateTaskInput, ListTasksInput, Task } from '@/@types/domain'
import { tasksTable } from '@/db/tasks-table'
import db from '@/lib/drizzle'
import type { TasksRepository } from '../interfaces/task.repository'

export class DrizzleTaskRepository implements TasksRepository {
  async list(_params: ListTasksInput): Promise<Task[]> {
    const limit = _params.itemsPerPage ?? -1
    const tempOffset = _params.page ? (_params.page - 1) * limit : 0
    const offset = limit > 0 ? tempOffset : 0

    const tasks = await db
      .select()
      .from(tasksTable)
      .where(
        and(
          _params.filter?.title
            ? ilike(tasksTable.title, `%${_params.filter.title}%`)
            : undefined,

          _params.filter?.description
            ? ilike(tasksTable.description, `%${_params.filter.description}%`)
            : undefined,
        ),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(tasksTable.id)

    return tasks
  }

  async findById(taskId: string): Promise<Task | null> {
    const result = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, taskId))

    return result[0]
  }

  async findByTitle(title: string): Promise<Task | null> {
    const result = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.title, title))

    return result[0]
  }

  async create(data: CreateTaskInput): Promise<Task> {
    const result = await db
      .insert(tasksTable)
      .values({
        title: data.title,
        description: data.description,
      })
      .returning()

    return result[0]
  }

  async update(task: Task): Promise<Task | null> {
    const result = await db
      .update(tasksTable)
      .set({
        title: task.title,
        description: task.description,
        completedAt: task.completedAt,
      })
      .where(eq(tasksTable.id, task.id))
      .returning()

    return result[0]
  }

  async delete(taskId: string): Promise<Task | null> {
    const result = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, taskId))
      .returning()

    return result[0]
  }
}
