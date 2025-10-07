export interface User {
  id: number
  uuid: string
  name: string
  username: string
  password: string
  active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  forceReset_pwd: boolean
  type_auth: string
  group_level: string
}
