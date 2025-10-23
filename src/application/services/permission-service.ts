import { PermissionsRepository } from "@/infra/db/repositories/pg/pg-permissions.repository"

export class PermissionService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async getAllPermissions(userId: number): Promise<string[]> {
    return this.permissionsRepository.findAllByUserId(userId)
  }

  async hasPermission(userId: number, permissionName: string): Promise<boolean> {
    const permissions = await this.permissionsRepository.findAllByUserId(userId)
    return permissions.includes(permissionName)
  }
}
