import { drizzle } from 'drizzle-orm/node-postgres'
import env from '@/env'

const db = drizzle(env.DATABASE_URL, {
  logger: true,
})

export default db
