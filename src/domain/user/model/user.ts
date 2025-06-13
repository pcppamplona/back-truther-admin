interface User {
  id: string
  name: string
  passwordHash: string
  createdAt: Date
}

interface CreateUser {
  name: string
  passwordHash: string
}

export { User, CreateUser }
