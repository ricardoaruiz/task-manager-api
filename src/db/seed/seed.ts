import { seedTasksTable } from './tasks'
import { seedUsersTable } from './users'

async function main() {
  await seedUsersTable()
  await seedTasksTable()
}

main()
