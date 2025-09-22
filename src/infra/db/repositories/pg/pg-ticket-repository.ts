import {
  FinalizationReply,
  FinalizeTicketInput,
  Reason,
  ReplyAction,
  Ticket,
  TicketComment,
} from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import { PostgresDatabase } from "../../pg/connection";
import { PaginatedResult, PaginationParams } from "@/shared/pagination";

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

  async findPaginated(
    params: PaginationParams
  ): Promise<PaginatedResult<Ticket>> {
    const {
      page,
      limit,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
    } = params;

    const client = await PostgresDatabase.getClient();
    const offset = (page - 1) * limit;

    const allowedSortBy = ["id", "title", "status", "created_at", "updated_at"];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";

    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(title ILIKE $${values.length} OR description ILIKE $${values.length})`
      );
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
      SELECT * FROM tickets
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*)::int AS total FROM tickets
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);

      return {
        data: result.rows as Ticket[],
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      client.release();
    }
  }

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

  async findReplyReasonsByReasonId(
    reason_id: number
  ): Promise<FinalizationReply[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT id, reason_id AS "reason_id", reply, comment
         FROM reply_reasons
         WHERE reason_id = $1`,
        [reason_id]
      );
      return result.rows as FinalizationReply[];
    } finally {
      client.release();
    }
  }

  async findReplyReasonsActionsByReplyId(
    replyId: number
  ): Promise<ReplyAction[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT id, reply_id AS "reply_id", type, data
         FROM reply_actions
         WHERE reply_id = $1`,
        [replyId]
      );
      return result.rows as ReplyAction[];
    } finally {
      client.release();
    }
  }

  async finalizeTicket(
    data: FinalizeTicketInput & { req?: any }
  ): Promise<Ticket> {
    const client = await PostgresDatabase.getClient();

    try {
      await client.query("BEGIN");

      // 1️⃣ Buscar ticket com lock
      const ticketResult = await client.query(
        `SELECT * FROM tickets WHERE id = $1 FOR UPDATE`,
        [data.ticketId]
      );
      const ticket = ticketResult.rows[0];
      if (!ticket) throw new Error("Ticket não encontrado");

      // 2️⃣ Criar comentário se existir
      if (data.commentText) {
        await client.query(
          `INSERT INTO ticket_comments (ticket_id, author, message, date)
         VALUES ($1, $2, $3, NOW())`,
          [data.ticketId, data.user.name, data.commentText]
        );

        await data.req?.audit?.({
          method: "POST",
          action: "alter",
          message: "Comentário adicionado",
          description: `Comentário adicionado ao ticket ${data.ticketId}`,
          sender_type: "USER",
          sender_id: String(data.user.id),
          target_type: "GUENO",
          target_id: String(data.ticketId),
        });
      }

      // 3️⃣ Buscar reply actions
      const replyActions = await client.query(
        `SELECT * FROM reply_actions WHERE reply_id = $1`,
        [data.replyId]
      );
      for (const action of replyActions.rows) {
        if (action.type === "new_event") {
          const reasonResult = await client.query(
            `SELECT * FROM ticket_reasons WHERE id = $1`,
            [action.data.reasonId]
          );
          const reason = reasonResult.rows[0];
          if (!reason) throw new Error("Reason não encontrado");

          await client.query(
            `INSERT INTO tickets (created_by, client_id, assigned_group, assigned_user, reason_id, status, created_at)
           VALUES ($1, $2, $3, $4, $5, 'PENDENTE', NOW())`,
            [
              JSON.stringify(data.user),
              ticket.client_id,
              action.data.groupId ?? data.user.group,
              data.user.id,
              reason.id,
            ]
          );

          await data.req?.audit?.({
            method: "POST",
            action: "alter",
            message: "Novo evento criado",
            description: `Criado novo evento vinculado à finalização de ${data.ticketId}`,
            sender_type: "USER",
            sender_id: String(data.user.id),
            target_type: "GUENO",
            target_id: String(data.ticketId),
          });
        }

        if (action.type === "send_email") {
          console.log(`Email simulado enviado para: ${action.data.email}`);
        }
      }

      // 4️⃣ Finalizar ticket
      const assignedTo =
        ticket.assigned_user ?? (data.forceAssign ? data.user.id : null);
      const updateResult = await client.query(
        `UPDATE tickets SET status = 'FINALIZADO', assigned_user = $1 WHERE id = $2 RETURNING *`,
        [assignedTo, data.ticketId]
      );
      const updatedTicket = updateResult.rows[0];

      await data.req?.audit?.({
        method: "PATCH",
        action: "alter",
        message: "Ticket finalizado",
        description: `Ticket ${data.ticketId} finalizado por ${data.user.name}`,
        sender_type: "USER",
        sender_id: String(data.user.id),
        target_type: "GUENO",
        target_id: String(data.ticketId),
      });

      await client.query("COMMIT");
      return updatedTicket;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
