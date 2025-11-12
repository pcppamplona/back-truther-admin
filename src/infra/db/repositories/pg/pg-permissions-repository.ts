import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";
import { PermissionsRepository } from "@/domain/permissions/repositories/permissions-repository";

export class PgPermissionsRepository implements PermissionsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async findAll(): Promise<
    { id: string; key_name: string; description: string }[]
  > {
    const client = await this.getClient();

    try {
      const result = await client.query(`
      SELECT id, key_name, description
      FROM permissions
      ORDER BY id ASC
    `);

      return result.rows.map((row) => ({
        id: row.id,
        key_name: row.key_name,
        description: row.description,
      }));
    } finally {
      client.release();
    }
  }

  async findAllByUserId(userId: number): Promise<string[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `
        (
          SELECT p.key_name
          FROM role_permissions rp
          JOIN permissions p ON p.id = rp.permission_id
          JOIN users u ON u.role_id = rp.role_id
          WHERE u.id = $1
        )
        UNION
        (
          SELECT p.key_name
          FROM user_permissions up
          JOIN permissions p ON p.id = up.permission_id
          WHERE up.user_id = $1
        )
        ORDER BY key_name
        `,
        [userId]
      );
      return result.rows.map((r) => r.key_name as string);
    } finally {
      client.release();
    }
  }
}
