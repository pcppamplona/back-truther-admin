import { PermissionService } from '@/application/services/permission-service'
import { PermissionsRepository } from '@/infra/db/repositories/pg/pg-permissions.repository'
import { PoolClient } from 'pg'

export function makePermissionService(client?: PoolClient) {
  const repo = new PermissionsRepository(client)
  return new PermissionService(repo)
}
