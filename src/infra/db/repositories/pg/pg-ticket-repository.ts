import { Ticket, TicketComment } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import { PostgresDatabase } from "../../pg/connection";

export class PgTicketRepository implements TicketsRepository {
  async createTicket(data: Ticket): Promise<Ticket> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `INSERT INTO tickets (created_by, client, assigned_to, reason, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          data.created_by,
          data.client,
          data.assigned_to,
          data.reason,
          data.status,
          data.created_at,
        ]
      );
      return result.rows[0] as Ticket;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Ticket[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM tickets ORDER BY created_at DESC`
      );
      return result.rows as Ticket[];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Ticket | null> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM tickets WHERE id = $1 LIMIT 1`,
        [id]
      );
      return result.rows[0] ?? null;
    } finally {
      client.release();
    }
  }

  async updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket> {
    const client = await PostgresDatabase.getClient();
    try {
      const fields = Object.keys(data);
      const values = Object.values(data);

      if (fields.length === 0) {
        throw new Error("Nenhum campo para atualizar.");
      }

      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

      const result = await client.query(
        `UPDATE tickets SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, id]
      );

      return result.rows[0] as Ticket;
    } finally {
      client.release();
    }
  }

  async createTicketComment(data: TicketComment): Promise<TicketComment> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `INSERT INTO ticket_comments (ticket_id, author, message, date)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [data.ticket_id, data.author, data.message, data.date]
      );
      return result.rows[0] as TicketComment;
    } finally {
      client.release();
    }
  }

  async findTicketCommentsById(ticket_id: number): Promise<TicketComment[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM ticket_comments WHERE ticket_id = $1 ORDER BY date DESC`,
        [ticket_id]
      );
      return result.rows as TicketComment[];
    } finally {
      client.release();
    }
  }
}
