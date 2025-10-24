import { PermissionService } from "@/application/services/permission-service"
import { PgPermissionsRepository } from "@/infra/db/repositories/pg/pg-permissions-repository"

export function makePermissionService(): PermissionService {
  const repository = new PgPermissionsRepository()
  return new PermissionService(repository)
}
