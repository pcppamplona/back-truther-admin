import { ActionsTypeRepository } from "@/domain/reasons/repositories/actions-type-repository";
import { PostgresDatabase } from "../../pg/connection";
import { PoolClient } from "pg";
import { ActionsType } from "@/domain/reasons/model/ticket-reasons";

export class PgActionsTypeRepository implements ActionsTypeRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async create(type: string): Promise<ActionsType> {
    const client = await this.getClient();
    const result = await client.query(
      `INSERT INTO actions_type (type) VALUES ($1) RETURNING *`,
      [type]
    );
    return result.rows[0];
  }

  async findAll(): Promise<ActionsType[]> {
    const client = await this.getClient();
    const result = await client.query(
      `SELECT * FROM actions_type ORDER BY id ASC`
    );
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    const client = await this.getClient();
    await client.query(
      `DELETE FROM actions_type WHERE id = $1`,
      [id]
    );
  }
}
