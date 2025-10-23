import { RolePermissionsRepository } from '@/domain/permissions/repositories/permissions-repository';
import { PoolClient } from 'pg'
import { PostgresDatabase } from '../../pg/connection';

export class PgRolePermissionsRepository implements RolePermissionsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client
    return PostgresDatabase.getClient()
  }

  async create(data: { role_id: number; permission_id: number }): Promise<void> {
    const client = await this.getClient()
    try {
      await client.query(
        `INSERT INTO role_permissions (role_id, permission_id)
         VALUES ($1, $2)
         ON CONFLICT (role_id, permission_id) DO NOTHING`,
        [data.role_id, data.permission_id]
      )
    } finally {
      client.release()
    }
  }

  async findByRoleId(roleId: number): Promise<string[]> {
    const client = await this.getClient()
    try {
      const result = await client.query(
        `SELECT p.name
         FROM role_permissions rp
         JOIN permissions p ON p.id = rp.permission_id
         WHERE rp.role_id = $1`,
        [roleId]
      )
      return result.rows.map(r => r.name)
    } finally {
      client.release()
    }
  }
}
