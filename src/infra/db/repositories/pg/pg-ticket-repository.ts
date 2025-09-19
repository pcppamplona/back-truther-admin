import { Reason, Ticket, TicketComment } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import { PostgresDatabase } from "../../pg/connection";

export class PgTicketRepository implements TicketsRepository {
  async createTicket(data: Ticket): Promise<Ticket> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `INSERT INTO tickets (created_by, client_id, assigned_group, assigned_user, reason_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
        [
          data.created_by,
          data.client_id,
          data.assigned_group,
          data.assigned_user,
          data.reason_id,
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

  // async findById(id: number): Promise<Ticket | null> {
  //   const client = await PostgresDatabase.getClient();
  //   try {
  //     const result = await client.query(
  //       `SELECT * FROM tickets WHERE id = $1 LIMIT 1`,
  //       [id]
  //     );
  //     return result.rows[0] ?? null;
  //   } finally {
  //     client.release();
  //   }
  // }
  async findById(id: number): Promise<Ticket | null> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `
      SELECT 
        t.id,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'group', u.group_level
        ) AS created_by,
        json_build_object(
          'id', c.id,
          'name', c.name,
          'document', ui.document,
          'phone', ui.phone
        ) AS client,
        t.assigned_group,
        json_build_object(
          'id', au.id,
          'name', au.name,
          'group', au.group_level
        ) AS assigned_user,
        tr.id AS reason_id,
        t.status,
        t.created_at
      FROM tickets t
      JOIN users u ON t.created_by = u.id
      LEFT JOIN clients c ON t.client_id = c.id
      LEFT JOIN userinfo ui ON ui.user_id = c.id 
      LEFT JOIN users au ON t.assigned_user = au.id
      JOIN ticket_reasons tr ON t.reason_id = tr.id
      WHERE t.id = $1
      LIMIT 1
      `,
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

  async findTicketReasonByCategoryId(category_id: number): Promise<Reason[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `
        SELECT 
          id,
          category_id,
          type,
          reason,
          expired_at,
          description,
          type_recipient,
          recipient
        FROM ticket_reasons
        WHERE category_id = $1
        `,
        [category_id]
      );
      return result.rows as Reason[];
    } finally {
      client.release();
    }
  }

  async findTicketReasonById(id: number): Promise<Reason | null> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `
        SELECT 
          id,
          category_id,
          type,
          reason,
          expired_at,
          description,
          type_recipient,
          recipient
        FROM ticket_reasons
        WHERE id = $1
        LIMIT 1
        `,
        [id]
      );
      return result.rows[0] ?? null;
    } finally {
      client.release();
    }
  }
}
