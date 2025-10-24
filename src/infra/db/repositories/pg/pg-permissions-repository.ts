import { PoolClient } from 'pg'
import { PostgresDatabase } from '../../pg/connection'
import { PermissionsRepository } from '@/domain/permissions/repositories/permissions-repository'

export class PgPermissionsRepository implements PermissionsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client
    return PostgresDatabase.getClient()
  }

  async findAllByUserId(userId: number): Promise<string[]> {
    const client = await this.getClient()
    try {
      const result = await client.query(
        `
        SELECT DISTINCT p.key_name
        FROM permissions p
        LEFT JOIN role_permissions rp ON rp.permission_id = p.id
        LEFT JOIN users u ON u.role_id = rp.role_id
        LEFT JOIN user_permissions up ON up.permission_id = p.id AND up.user_id = u.id
        WHERE u.id = $1
        
        `,
        [userId]
      )
      return result.rows.map(r => r.key_name)
    } finally {
      client.release()
    }
  }
}
