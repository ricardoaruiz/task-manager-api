import env from '@/env'
import { DatabaseUseCaseFactory } from './use-case-database-factory'
import { InMemoryUseCaseFactory } from './use-case-in-memory-factory'
import type { UseCaseFactory } from './use-case-interface-factory'

export function getUseCaseFactory(): UseCaseFactory {
  return env.PERSISTENCE_TYPE === 'in-memory'
    ? InMemoryUseCaseFactory.getInstance()
    : DatabaseUseCaseFactory.getInstance()
}
