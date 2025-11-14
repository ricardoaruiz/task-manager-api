import { afterAll, beforeAll } from 'vitest'
import { app } from '@/app'

beforeAll(async () => {
  console.log('Before all tests...')
  await app.ready()
})

afterAll(async () => {
  console.log('After all tests...')
  await app.close()
})
