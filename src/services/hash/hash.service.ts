import bcrypt from 'bcryptjs'
import type { HashService } from './hash.service.interface'
import type { CompareHashParams, GenerateHashParams } from './hash.types'

export class BcryptHashService implements HashService {
  generate({ plainText }: GenerateHashParams): string {
    return bcrypt.hashSync(plainText, 10)
  }

  compare({ plainText, hashedText }: CompareHashParams): boolean {
    return bcrypt.compareSync(plainText, hashedText)
  }
}
