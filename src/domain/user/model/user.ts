interface User {
  id: number
  uuid: string
  name: string
  username: string
  passwordHash: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  forceResetPwd: boolean
  typeAuth: string
}

interface CreateUser {
  uuid?: string
  name: string
  username: string
  passwordHash: string
  active?: boolean
  forceResetPwd?: boolean
  typeAuth?: string
}

export { User, CreateUser }
