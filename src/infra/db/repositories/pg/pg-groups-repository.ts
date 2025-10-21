import { GroupsRepository } from "@/domain/user/repositories/group-repository";
import { PostgresDatabase } from "../../pg/connection";
import { CreateGroup, Group } from "@/domain/user/model/group";
import { PoolClient } from "pg";

export class PgGroupsRepository implements GroupsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async findById(id: number): Promise<Group | null> {
    const client = await this.getClient();

    try {
      const result = await client.query(
        `SELECT id, group_name AS "groupName", id_pai AS "idPai"
                 FROM groups
                 WHERE id = $1
                 LIMIT 1`,
        [id]
      );

      if (result.rowCount === 0) return null;

      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findGroupAndDescendants(groupIds: number[]): Promise<number[]> {
    const client = await this.getClient();

    try {
      const result = await client.query(
        `
                WITH RECURSIVE group_tree AS (
                    SELECT id FROM groups WHERE id = ANY($1::int[])
                    UNION
                    SELECT g.id FROM groups g
                    INNER JOIN group_tree gt ON g.id_pai = gt.id
                )
                SELECT id FROM group_tree
                `,
        [groupIds]
      );

      return result.rows.map((row) => row.id);
    } finally {
      client.release();
    }
  }

  async create(data: CreateGroup): Promise<{ id: number }> {
    const client = await this.getClient();

    try {
      const result = await client.query(
        `INSERT INTO groups (group_name, id_pai)
                 VALUES ($1, $2)
                 RETURNING id`,
        [data.groupName, data.idPai ?? null]
      );

      return { id: result.rows[0].id };
    } finally {
      client.release();
    }
  }
}
