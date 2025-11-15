import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'
import { tasksTable } from './tasks-table'

export const userTable = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
})

export const userRelations = relations(userTable, ({ many }) => ({
  tasks: many(tasksTable),
}))
