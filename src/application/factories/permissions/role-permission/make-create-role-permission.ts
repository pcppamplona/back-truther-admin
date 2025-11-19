import { CreateRolePermissionUseCase } from "@/application/use-cases/permissions/role-permission/create-role-permission"
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions-repository"
import { PoolClient } from "pg"

export function makeCreateRolePermissionUseCase(client?: PoolClient) {
  const repo = new PgRolePermissionsRepository(client)
  return new CreateRolePermissionUseCase(repo)
}
