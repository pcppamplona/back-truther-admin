import { GetPermissionsUseCase } from "@/application/use-cases/permissions/get-permission";
import { PgPermissionsRepository } from "@/infra/db/repositories/pg/pg-permissions-repository";

export function makeGetPermissionUseCase() {
  const repo = new PgPermissionsRepository()

  return new GetPermissionsUseCase(repo)
}