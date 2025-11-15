import { and, eq, ilike } from 'drizzle-orm'
import type { CreateTaskInput, ListTasksInput, Task } from '@/@types/domain'
import { tasksTable } from '@/db/schema/tasks-table'
import db from '@/lib/drizzle'
import type { TasksRepository } from '../interfaces/task.repository'

export class DrizzleTaskRepository implements TasksRepository {
  async list(params: ListTasksInput): Promise<Task[]> {
    const limit = params.itemsPerPage ?? -1
    const tempOffset = params.page ? (params.page - 1) * limit : 0
    const offset = limit > 0 ? tempOffset : 0

    const tasks = await db
      .select()
      .from(tasksTable)
      .where(
        and(
          eq(tasksTable.user_id, params.user_id),
          params.filter?.title
            ? ilike(tasksTable.title, `%${params.filter.title}%`)
            : undefined,

          params.filter?.description
            ? ilike(tasksTable.description, `%${params.filter.description}%`)
            : undefined,
        ),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(tasksTable.id)

    return tasks
  }

  async findById(taskId: string, userId: string): Promise<Task | null> {
    const result = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.id, taskId), eq(tasksTable.user_id, userId)))

    return result[0]
  }

  async findByTitle(title: string, userId: string): Promise<Task | null> {
    const result = await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.title, title), eq(tasksTable.user_id, userId)))

    return result[0]
  }

  async create({
    title,
    description,
    user_id,
  }: CreateTaskInput): Promise<Task> {
    const result = await db
      .insert(tasksTable)
      .values({
        user_id,
        title,
        description,
      })
      .returning()

    return result[0]
  }

  async update({
    title,
    description,
    completed_at,
    id,
    user_id,
  }: Task): Promise<Task | null> {
    const result = await db
      .update(tasksTable)
      .set({
        title,
        description,
        completed_at,
      })
      .where(and(eq(tasksTable.id, id), eq(tasksTable.user_id, user_id)))
      .returning()

    return result[0]
  }

  async delete(taskId: string, userId: string): Promise<Task | null> {
    const result = await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, taskId), eq(tasksTable.user_id, userId)))
      .returning()

    return result[0]
  }
}
