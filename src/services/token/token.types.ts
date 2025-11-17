export type GenerateTokenParams = {
  id: string
  email: string
  name: string
}

export type JwtPayload = {
  sub: string
  name: string
  email: string
}
