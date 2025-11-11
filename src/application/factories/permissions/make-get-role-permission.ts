import { GetRolePermissionsUseCase } from "@/application/use-cases/permissions/get-role-permissions"
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions-repository"
import { PoolClient } from "pg"

export function makeGetRolePermissionsUseCase(client?: PoolClient) {
  const repo = new PgRolePermissionsRepository(client)
  return new GetRolePermissionsUseCase(repo)
}
