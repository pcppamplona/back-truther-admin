import { DeleteRolePermissionUseCase } from "@/application/use-cases/permissions/role-permission/delete-role-permission"
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions-repository"

export function makeDeleteRolePermissionUseCase() {
  const repo = new PgRolePermissionsRepository()
  return new DeleteRolePermissionUseCase(repo)
}
