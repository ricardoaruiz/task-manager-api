export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type CreateUserInput = Omit<User, 'id'>
export type MeInput = {
  email: string
}
export type MeOutput = Omit<User, 'password'>
