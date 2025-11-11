import { RolePermission, UserPermission } from "../model/permissions"


export interface RolePermissionsRepository {
  create(data: Omit<RolePermission, 'id'>): Promise<void>
  findByRoleId(roleId: number): Promise<string[]>
  findDetailsByRoleId(roleId: number): Promise<{ id: number, key_name: string; description: string | null }[]>
  delete(roleId: number, permissionId: number): Promise<void>
}

export interface UserPermissionsRepository {
  create(data: Omit<UserPermission, 'id'>): Promise<void>
  findByUserId(userId: number): Promise<string[]>
  findDetailsByUserId(userId: number): Promise<{ id: number; key_name: string; description: string | null }[]>
  delete(userId: number, permissionId: number): Promise<void>
}

export interface PermissionsRepository {
  findAllByUserId(userId: number): Promise<string[]>
}
