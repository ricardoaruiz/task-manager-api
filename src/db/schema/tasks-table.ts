import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'
import { userTable } from './user-table'

export const tasksTable = pgTable('tasks', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: varchar({ length: 50 }).unique().notNull(),
  description: varchar({ length: 255 }).notNull(),
  completed_at: timestamp({ mode: 'date' }),
  archived_at: timestamp({ mode: 'date' }),
  user_id: text()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
})

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  user: one(userTable, {
    fields: [tasksTable.user_id],
    references: [userTable.id],
  }),
}))
