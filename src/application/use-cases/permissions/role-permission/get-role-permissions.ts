import { RolePermissionsRepository } from "@/domain/permissions/repositories/permissions-repository";

export class GetRolePermissionsUseCase {
  constructor(private rolePermissionsRepository: RolePermissionsRepository) {}

  async execute(roleId: number): Promise<{ key_name: string; description: string | null }[]> {
    return this.rolePermissionsRepository.findDetailsByRoleId(roleId)
  }
}
