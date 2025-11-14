import db from '@/lib/drizzle'
import { tasksTable } from '../schema'

export async function seedTasksTable() {
  console.log('Iniciando a geração das tasks de exemplo...')
  for (let i = 1; i <= 20; i++) {
    await db.insert(tasksTable).values({
      title: `Task #${i}`,
      description: `Description Task #${i}`,
      completedAt: i % 2 === 0 ? new Date() : null,
    })
  }
  console.log('Finalizando a geração das tasks de exemplo...')
}
