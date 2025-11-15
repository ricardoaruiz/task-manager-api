import type { User } from './user'

export type LoginInput = {
  email: string
  password: string
}

export type LoginOutput = Omit<User, 'password'> & {
  token: string
}
