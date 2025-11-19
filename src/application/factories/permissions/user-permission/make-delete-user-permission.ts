import { DeleteUserPermissionUseCase } from "@/application/use-cases/permissions/user-permission/delete-user-permission"
import { PgUserPermissionsRepository } from "@/infra/db/repositories/pg/pg-user-permissions-repository"

export function makeDeleteUserPermissionUseCase() {
  const repo = new PgUserPermissionsRepository()
  return new DeleteUserPermissionUseCase(repo)
}