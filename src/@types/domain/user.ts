export type User = {
  id: string
  email: string
  name: string
  password: string
}

export type CreateUserInput = Omit<User, 'id'>
