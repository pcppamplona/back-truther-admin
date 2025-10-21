import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";
import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";
import { ReasonCategories } from "@/domain/reasons/model/ticket-reasons";

export class PgReasonCategoriesRepository
  implements ReasonCategoriesRepository
{
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async createCategory(data: {
    type: string;
    description: string;
  }): Promise<ReasonCategories> {
    const client = await this.getClient();

    const result = await client.query(
      `INSERT INTO reason_categories (type, description)
     VALUES ($1, $2)
     RETURNING *`,
      [data.type, data.description]
    );

    return result.rows[0];
  }

  async findAll(): Promise<ReasonCategories[]> {
    const client = await this.getClient();

    const query = `
      SELECT id, type, description
      FROM reason_categories
      ORDER BY id ASC;
    `;

    const { rows } = await client.query<ReasonCategories>(query);
    return rows;
  }

  async findById(id: number): Promise<ReasonCategories | null> {
    const client = await this.getClient();

    const query = `
      SELECT id, type, description
      FROM reason_categories
      WHERE id = $1;
    `;

    const { rows } = await client.query<ReasonCategories>(query, [id]);
    return rows[0] || null;
  }

  async updateCategory(
    id: number,
    data: Partial<ReasonCategories>
  ): Promise<ReasonCategories> {
    const client = await this.getClient();

    const query = `
      UPDATE reason_categories
      SET 
        type = COALESCE($1, type),
        description = COALESCE($2, description)
      WHERE id = $3
      RETURNING *;
    `;

    const values = [data.type ?? null, data.description ?? null, id];
    const { rows } = await client.query<ReasonCategories>(query, values);
    return rows[0];
  }

  async delete(id: number): Promise<void> {
    const client = await this.getClient();

    const query = `
      DELETE FROM reason_categories
      WHERE id = $1;
    `;

    await client.query(query, [id]);
  }
}
