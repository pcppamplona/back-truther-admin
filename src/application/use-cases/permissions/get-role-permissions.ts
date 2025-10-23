import { RolePermissionsRepository } from "@/domain/permissions/repositories/permissions-repository";

export class GetRolePermissionsUseCase {
  constructor(private rolePermissionsRepository: RolePermissionsRepository) {}

  async execute(roleId: number): Promise<string[]> {
    return this.rolePermissionsRepository.findByRoleId(roleId)
  }
}
