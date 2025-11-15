import { SignJWT } from 'jose'
import env from '@/env'
import type { TokenService } from '..'
import type { GenerateTokenParams } from './token.types'

export class JoseTokenService implements TokenService {
  async generateToken({
    id,
    email,
    name,
  }: GenerateTokenParams): Promise<string> {
    const token = await new SignJWT({
      sub: id,
      email,
      name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(env.JWT_SECRET))

    return token
  }
}
