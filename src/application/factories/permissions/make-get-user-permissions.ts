import { GetUserPermissionsUseCase } from "@/application/use-cases/permissions/get-user-permissions"
import { PgUserPermissionsRepository } from "@/infra/db/repositories/pg/pg-user-permissions-repository"
import { PoolClient } from "pg"

export function makeGetRolePermissionUseCase(client?: PoolClient) {
  const repo = new PgUserPermissionsRepository(client)
  return new GetUserPermissionsUseCase(repo)
}
