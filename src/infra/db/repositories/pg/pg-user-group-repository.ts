import { UserGroupsRepository } from "@/domain/user/repositories/user-group-repository";
import { PostgresDatabase } from "../../pg/connection";
import { PoolClient } from "pg";

export class PgUserGroupsRepository implements UserGroupsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  addUserToGroup(
    userId: number,
    groupId: number,
    isMain?: boolean
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findGroupIdsByUserId(userId: number): Promise<number[]> {
    const client = await this.getClient();

    try {
      const result = await client.query(
        `SELECT group_id FROM user_groups WHERE user_id = $1`,
        [userId]
      );

      return result.rows.map((row) => row.group_id);
    } finally {
      client.release();
    }
  }
}
