import { RolePermissionsRepository } from "@/domain/permissions/repositories/permissions-repository"

interface Input {
  role_id: number
  permission_id: number
}

export class CreateRolePermissionUseCase {
  constructor(private rolePermissionsRepository: RolePermissionsRepository) {}

  async execute({ role_id, permission_id }: Input): Promise<void> {
    await this.rolePermissionsRepository.create({ role_id, permission_id })
  }
}
