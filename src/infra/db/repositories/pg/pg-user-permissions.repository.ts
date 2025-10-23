import { UserPermissionsRepository } from '@/domain/permissions/repositories/permissions-repository';
import { PoolClient } from 'pg'
import { PostgresDatabase } from '../../pg/connection';

export class PgUserPermissionsRepository implements UserPermissionsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client
    return PostgresDatabase.getClient()
  }

  async create(data: { user_id: number; permission_id: number }): Promise<void> {
    const client = await this.getClient()
    try {
      await client.query(
        `INSERT INTO user_permissions (user_id, permission_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, permission_id) DO NOTHING`,
        [data.user_id, data.permission_id]
      )
    } finally {
      client.release()
    }
  }

  async findByUserId(userId: number): Promise<string[]> {
    const client = await this.getClient()
    try {
      const result = await client.query(
        `SELECT p.name
         FROM user_permissions up
         JOIN permissions p ON p.id = up.permission_id
         WHERE up.user_id = $1`,
        [userId]
      )
      return result.rows.map(r => r.name)
    } finally {
      client.release()
    }
  }
}
