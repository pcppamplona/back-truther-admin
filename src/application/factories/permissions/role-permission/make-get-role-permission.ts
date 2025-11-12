import { GetRolePermissionsUseCase } from "@/application/use-cases/permissions/role-permission/get-role-permissions"
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions-repository"

export function makeGetRolePermissionUseCase() {
  const repo = new PgRolePermissionsRepository()
  return new GetRolePermissionsUseCase(repo)
}
