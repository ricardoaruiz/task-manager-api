import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const tasksTable = pgTable('tasks', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: varchar({ length: 50 }).unique().notNull(),
  description: varchar({ length: 255 }).notNull(),
  completedAt: timestamp({ mode: 'date' }),
})
