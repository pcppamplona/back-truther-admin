export interface User {
  id: number
  uuid: string
  name: string
  username: string
  password: string
  active: boolean
  created_at: string
  type_auth: string
  group_level: string
  role_id: number
}