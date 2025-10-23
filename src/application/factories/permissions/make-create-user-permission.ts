import { CreateUserPermissionUseCase } from "@/application/use-cases/permissions/create-user-permission"
import { PgUserPermissionsRepository } from "@/infra/db/repositories/pg/pg-user-permissions.repository"
import { PoolClient } from "pg"

export function makeCreateUserPermissionsUseCase(client?: PoolClient) {
  const repo = new PgUserPermissionsRepository(client)
  return new CreateUserPermissionUseCase(repo)
}
