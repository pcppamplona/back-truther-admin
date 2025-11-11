import { GetUserPermissionsUseCase } from "@/application/use-cases/permissions/user-permission/get-user-permissions"
import { PgUserPermissionsRepository } from "@/infra/db/repositories/pg/pg-user-permissions-repository"


export function makeGetUserPermissionUseCase() {
  const repo = new PgUserPermissionsRepository()
  return new GetUserPermissionsUseCase(repo)
}
