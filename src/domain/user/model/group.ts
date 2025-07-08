// domain/user/model/group.ts
export interface Group {
  id: number
  name: string
  parentId: number | null
}

export interface UserGroup {
  id: number
  userId: number
  groupId: number
  isPrimary: boolean
}
