import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@/db/schema/schema'
import env from '@/env'

const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: true,
})

export default db
