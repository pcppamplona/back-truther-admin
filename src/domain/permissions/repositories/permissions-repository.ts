import { RolePermission, UserPermission } from "../model/permissions"


export interface RolePermissionsRepository {
  create(data: Omit<RolePermission, 'id'>): Promise<void>
  findByRoleId(roleId: number): Promise<string[]>
}

export interface UserPermissionsRepository {
  create(data: Omit<UserPermission, 'id'>): Promise<void>
  findByUserId(userId: number): Promise<string[]>
}

export interface PermissionsRepository {
  findAllByUserId(userId: number): Promise<string[]>
}
