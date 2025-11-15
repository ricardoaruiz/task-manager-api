import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const userTable = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
})
