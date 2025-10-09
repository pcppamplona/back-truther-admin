import { ReplyActionsRepository } from "@/domain/reasons/repositories/reply-actions-repository";
import { ReplyAction } from "@/domain/reasons/model/ticket-reasons";
import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";

export class PgReplyActionsRepository implements ReplyActionsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async create(data: {
    reply_id: number;
    action_type_id: number;
    data_email: string | null;
    data_new_ticket_reason_id: number | null;
    data_new_ticket_assign_to_group: string | null;
  }): Promise<ReplyAction> {
    const client = await this.getClient();
    const result = await client.query(
      `INSERT INTO reply_actions
        (reply_id, action_type_id, data_email, data_new_ticket_reason_id, data_new_ticket_assign_to_group)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.reply_id,
        data.action_type_id,
        data.data_email,
        data.data_new_ticket_reason_id,
        data.data_new_ticket_assign_to_group,
      ]
    );
    return result.rows[0];
  }

  async findByReplyId(reply_id: number): Promise<ReplyAction[]> {
    const client = await this.getClient();
    const result = await client.query(
      `SELECT * FROM reply_actions WHERE reply_id = $1 ORDER BY id ASC`,
      [reply_id]
    );
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    const client = await this.getClient();
    await client.query(`DELETE FROM reply_actions WHERE id = $1`, [id]);
  }
}
