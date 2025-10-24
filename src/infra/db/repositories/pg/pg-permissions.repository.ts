import { PoolClient } from 'pg';
import { PostgresDatabase } from '../../pg/connection';

export class PermissionsRepository {
  constructor(private readonly client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async findAllByUserId(userId: number): Promise<string[]> {
    const client = await this.getClient();
    const shouldRelease = !this.client;

    try {
      const query = `
        SELECT DISTINCT p.key_name
        FROM permissions p
        LEFT JOIN role_permissions rp ON rp.permission_id = p.id
        LEFT JOIN user_permissions up ON up.permission_id = p.id
        LEFT JOIN users u ON u.id = up.user_id OR u.role_id = rp.role_id
        WHERE u.id = $1
      `;

      const result = await client.query<{ name: string }>(query, [userId]);
      return result.rows.map(r => r.name);
    } finally {
      if (shouldRelease) client.release();
    }
  }
}
