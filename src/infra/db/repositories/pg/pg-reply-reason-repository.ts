import { ReplyReasonsRepository } from "@/domain/reasons/repositories/reply-reasons-repository";
import { ReplyReason } from "@/domain/reasons/model/ticket-reasons";
import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";

export class PgReplyReasonsRepository implements ReplyReasonsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async create(data: {
    reason_id: number;
    reply: string;
    comment: boolean;
  }): Promise<ReplyReason> {
    const client = await this.getClient();
    const result = await client.query(
      `INSERT INTO reply_reasons (reason_id, reply, comment)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.reason_id, data.reply, data.comment]
    );
    return result.rows[0];
  }

  async findByReasonId(reason_id: number): Promise<ReplyReason[]> {
    const client = await this.getClient();
    const result = await client.query(
      `SELECT * FROM reply_reasons WHERE reason_id = $1 ORDER BY id ASC`,
      [reason_id]
    );
    return result.rows;
  }

  async findAll(): Promise<ReplyReason[]> {
    const client = await this.getClient();
    const result = await client.query(
      `SELECT * FROM reply_reasons ORDER BY id DESC`
    );
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    const client = await this.getClient();
    await client.query(`DELETE FROM reply_reasons WHERE id = $1`, [id]);
  }
}
