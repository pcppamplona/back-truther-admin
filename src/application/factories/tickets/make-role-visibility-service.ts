import { RoleVisibilityService } from '@/application/services/role-visibility-service'
import { PoolClient } from 'pg'

export function makeRoleVisibilityService() {
  return new RoleVisibilityService()
}
