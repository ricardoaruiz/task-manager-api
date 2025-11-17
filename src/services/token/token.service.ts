import { jwtVerify, SignJWT } from 'jose'
import env from '@/env'
import type { TokenService } from './token.service.interface'
import type { GenerateTokenParams, JwtPayload } from './token.types'

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

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(env.JWT_SECRET),
      )
      return payload as JwtPayload
    } catch (_error) {
      return null
    }
  }
}
