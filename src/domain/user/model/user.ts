export interface User {
  id: number
  uuid: string
  name: string
  username: string
  password: string
  active: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  forceResetPwd: boolean
  typeAuth: string
  groupLevel: string
}
