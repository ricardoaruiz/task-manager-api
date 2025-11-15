import db from '@/lib/drizzle'
import { BcryptHashService } from '@/services/hash/hash.service'
import { userTable } from '../schema/user-table'

export async function seedUsersTable() {
  console.log('Iniciando a geração dos usuários de exemplo...')
  const hashService = new BcryptHashService()

  try {
    await db.insert(userTable).values({
      name: 'Rick Ruiz',
      email: 'rick@email.com',
      password: hashService.generate({ plainText: '123456' }),
    })
  } catch (_error) {
    console.error('Erro ao inserir o usuário Rick Ruiz:')
  }

  try {
    await db.insert(userTable).values({
      name: 'Gui Ruiz',
      email: 'gui@email.com',
      password: hashService.generate({ plainText: '123456' }),
    })
  } catch (_error) {
    console.error('Erro ao inserir o usuário Gui Ruiz:')
  }

  console.log('Finalizando a geração dos usuários de exemplo...')
}
