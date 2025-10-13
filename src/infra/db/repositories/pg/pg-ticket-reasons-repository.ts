import {
  ReplyAction,
  ReplyReason,
  TicketReason,
} from "@/domain/reasons/model/ticket-reasons";
import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";
import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";

export class PgTicketReasonRepository implements TicketReasonRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async create(
    reason: TicketReason,
    replies: Array<{ reply: string; comment: boolean; actions: ReplyAction[] }>
  ): Promise<TicketReason> {
    const client = await this.getClient();
    const localClient = !this.client;

    try {
      if (localClient) await client.query("BEGIN");

      const reasonRes = await client.query<TicketReason>(
        `
          INSERT INTO ticket_reasons (category_id, type, reason, expired_at, description, type_recipient, recipient)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
          `,
        [
          reason.category_id,
          reason.type,
          reason.reason,
          reason.expired_at,
          reason.description,
          reason.type_recipient,
          reason.recipient,
        ]
      );

      const createdReason = reasonRes.rows[0];

      for (const r of replies) {
        const replyRes = await client.query<ReplyReason>(
          `
            INSERT INTO reply_reasons (reason_id, reply, comment)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          [createdReason.id, r.reply, r.comment]
        );

        const reply = replyRes.rows[0];

        for (const action of r.actions) {
          await client.query(
            `
              INSERT INTO reply_actions (reply_id, action_type_id, data_email, data_new_ticket_reason_id, data_new_ticket_assign_to_group)
              VALUES ($1, $2, $3, $4, $5);
              `,
            [
              reply.id,
              action.action_type_id,
              action.data_email ?? null,
              action.data_new_ticket_reason_id ?? null,
              action.data_new_ticket_assign_to_group ?? null,
            ]
          );
        }
      }

      if (localClient) await client.query("COMMIT");
      return createdReason;
    } catch (err) {
      if (localClient) await client.query("ROLLBACK");
      throw err;
    } finally {
      if (localClient) client.release();
    }
  }

  async findById(id: number) {
    const client = await this.getClient();
    const reasonRes = await client.query(
      `SELECT * FROM ticket_reasons WHERE id = $1`,
      [id]
    );
    if (reasonRes.rowCount === 0) return null;

    const repliesRes = await client.query(
      `SELECT * FROM reply_reasons WHERE reason_id = $1`,
      [id]
    );
    const replies = await Promise.all(
      repliesRes.rows.map(async (reply) => {
        const actionsRes = await client.query(
          `SELECT * FROM reply_actions WHERE reply_id = $1`,
          [reply.id]
        );
        return { ...reply, actions: actionsRes.rows };
      })
    );

    return { ...reasonRes.rows[0], replies };
  }

  // async findAll() {
  //   const client = await this.getClient();
  //   const res = await client.query(
  //     `SELECT * FROM ticket_reasons ORDER BY id DESC`
  //   );
  //   return res.rows;
  // }
  async findAll(): Promise<TicketReason[]> {
    const client = await this.getClient();
    const res = await client.query(
      `
    SELECT 
      tr.*,
      COALESCE(
        JSON_AGG(
          DISTINCT JSONB_BUILD_OBJECT(
            'id', rr.id,
            'reply', rr.reply,
            'comment', rr.comment,
            'actions', COALESCE(
              (
                SELECT JSON_AGG(
                  JSONB_BUILD_OBJECT(
                    'id', ra.id,
                    'action_type_id', ra.action_type_id,
                    'data_email', ra.data_email,
                    'data_new_ticket_reason_id', ra.data_new_ticket_reason_id,
                    'data_new_ticket_assign_to_group', ra.data_new_ticket_assign_to_group
                  )
                )
                FROM reply_actions ra
                WHERE ra.reply_id = rr.id
              ),
              '[]'::JSON
            )
          )
        ) FILTER (WHERE rr.id IS NOT NULL),
        '[]'::JSON
      ) AS replies
    FROM ticket_reasons tr
    LEFT JOIN reply_reasons rr ON rr.reason_id = tr.id
    GROUP BY tr.id
    ORDER BY tr.id DESC;
    `
    );

    return res.rows;
  }

  async update(id: number, data: Partial<TicketReason>) {
    const client = await this.getClient();
    const entries = Object.entries(data);
    if (entries.length === 0) return;

    const setClause = entries.map(([k], i) => `${k} = $${i + 1}`).join(", ");
    const values = entries.map(([_, v]) => v);
    await client.query(
      `UPDATE ticket_reasons SET ${setClause} WHERE id = $${values.length + 1}`,
      [...values, id]
    );
  }

  async delete(id: number) {
    const client = await this.getClient();
    await client.query(`DELETE FROM ticket_reasons WHERE id = $1`, [id]);
  }
}
