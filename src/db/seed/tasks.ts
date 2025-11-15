import db from '@/lib/drizzle'
import { tasksTable, userTable } from '../schema/schema'

export async function seedTasksTable() {
  console.log('Iniciando a geração das tasks de exemplo...')

  const users = await db.select().from(userTable)

  for (let i = 1; i <= 20; i++) {
    const isOdd = i % 2 !== 0
    const userId = isOdd ? users[0].id : users[1].id
    const completedAt = isOdd ? new Date() : null

    try {
      await db.insert(tasksTable).values({
        title: `Task #${i}`,
        description: `Description Task #${i}`,
        completed_at: completedAt,
        user_id: userId,
      })
    } catch (_error) {
      console.error(`Erro ao inserir a task #${i}`)
    }
  }
  console.log('Finalizando a geração das tasks de exemplo...')
}
