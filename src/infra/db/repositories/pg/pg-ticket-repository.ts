import {
  FinalizationReply,
  Ticket,
  TicketComment,
  TicketData,
} from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import { PostgresDatabase } from "../../pg/connection";
import { PaginatedResult, PaginationParams } from "@/shared/pagination";
import { PoolClient } from "pg";
import {
  ReplyAction,
  TicketReason,
} from "@/domain/reasons/model/ticket-reasons";

export class PgTicketRepository implements TicketsRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async withTransaction<T>(
    callback: (txRepo: PgTicketRepository) => Promise<T>
  ): Promise<T> {
    const client = await PostgresDatabase.getClient();
    try {
      await client.query("BEGIN");
      const txRepo = new PgTicketRepository(client);
      const result = await callback(txRepo);
      await client.query("COMMIT");
      return result;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async createTicket(data: Ticket): Promise<Ticket> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `INSERT INTO tickets (created_by, client_id, assigned_role, assigned_user, reason_id, status, chain_id_main, chain_id_last)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
        [
          data.created_by,
          data.client_id,
          data.assigned_role ?? null,
          data.assigned_user,
          data.reason_id,
          data.status,
          data.chain_id_main ?? null,
          data.chain_id_last ?? null,
        ]
      );
      return result.rows[0] as Ticket;
    } finally {
      if (!this.client) client.release();
    }
  }

  async findAll(): Promise<Ticket[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM tickets ORDER BY created_at DESC`
      );
      return result.rows as Ticket[];
    } finally {
      if (!this.client) client.release();
    }
  }

  async findPaginated(
    params: PaginationParams & {
      onlyAssigned?: boolean;
      assignedRole?: number;
      userId?: string;
      status?: string;
    }
  ): Promise<PaginatedResult<Ticket>> {
    const {
      page,
      limit,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
      onlyAssigned,
      assignedRole,
      assignedRoles,
      userId,
      status,
    } = params;

    const client = await this.getClient();
    const offset = (page - 1) * limit;

    const allowedSortBy = ["id", "status", "created_at"];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";
    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(CAST(t.id AS TEXT) ILIKE $${values.length}
            OR tr.reason ILIKE $${values.length}
            OR tr.description ILIKE $${values.length})`
      );
    }

    // Visibility filter 
    if (assignedRoles === null || assignedRoles === undefined) {
        // CASE 1: ADMIN - No assignedRoles array means view all.
        // The 'where' and 'values' arrays remain unchanged for visibility.
    } else if (assignedRoles.length > 0) {
        // CASE 2: N2, N3, etc. - Visibility based on the list of roles they can see.
        
        const pgArray = `{${assignedRoles.join(",")}}`;
        values.push(pgArray);
        const rolesIdx = values.length;

        let roleFilter = `t.assigned_role = ANY($${rolesIdx}::int[])`;

        if (userId && onlyAssigned) {
            // N2/N3 only want to see tickets explicitly assigned to them 
            // *within* their visibility roles.
            values.push(userId);
            const userIdx = values.length;
            roleFilter = `(${roleFilter} AND t.assigned_user = $${userIdx})`;
        }
        where.push(roleFilter);
        
    } else if (userId) { 
        // CASE 3: N1 - assignedRoles is [] (empty array) but userId exists. 
        // N1 only sees tickets created OR assigned to him.
        values.push(userId); 
        const userIdx = values.length; 

        if (onlyAssigned) {
            // only tickets assigned to the user
            where.push(`t.assigned_user = $${userIdx}`);
        } else {
            // tickets created by OR assigned to the user (use same param twice)
            where.push(`(t.created_by = $${userIdx} OR t.assigned_user = $${userIdx})`);
        }
    }

    if (assignedRole != null) {
        values.push(Number(assignedRole));
        where.push(`t.assigned_role = $${values.length}`);
    }

    if (status) {
      values.push(status);
      where.push(`t.status = $${values.length}`);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    // add limit and offset
    const limitIdx = values.length + 1;
    const offsetIdx = values.length + 2;
    values.push(limit, offset);

    try {
      const query = `
        SELECT
          t.id,
          json_build_object(
            'id', u.id,
            'name', u.name,
            'role', json_build_object('id', r_u.id, 'name', r_u.name, 'description', r_u.description)
          ) AS created_by,
          json_build_object(
            'id', c.id,
            'name', c.name,
            'document', ui.document,
            'phone', ui.phone
          ) AS client,
          t.assigned_role,
          json_build_object(
            'id', au.id,
            'name', au.name,
            'role', json_build_object('id', r_au.id, 'name', r_au.name, 'description', r_au.description)
          ) AS assigned_user,
          json_build_object(
            'id', tr.id,
            'category_id', tr.category_id,
            'type', tr.type_recipient,
            'reason', tr.reason,
            'description', tr.description,
            'expired_at', tr.expired_at,
            'type_recipient', tr.type_recipient,
            'recipient', tr.recipient
          ) AS reason,
          t.status,
          t.created_at
        FROM tickets t
        JOIN users u ON t.created_by = u.id
        LEFT JOIN roles r_u ON u.role_id = r_u.id
        LEFT JOIN clients c ON t.client_id = c.id
        LEFT JOIN userinfo ui ON ui.user_id = c.id
        LEFT JOIN users au ON t.assigned_user = au.id
        LEFT JOIN roles r_au ON au.role_id = r_au.id
        LEFT JOIN ticket_reasons tr ON t.reason_id = tr.id
        ${whereClause}
        ORDER BY t.${safeSortBy} ${safeSortOrder}
        LIMIT $${limitIdx} OFFSET $${offsetIdx}
      `;

      const countQuery = `
        SELECT COUNT(*)::int AS total
        FROM tickets t
        JOIN users u ON t.created_by = u.id
        LEFT JOIN users au ON t.assigned_user = au.id
        JOIN ticket_reasons tr ON t.reason_id = tr.id
        ${whereClause};
      `;

    const result = await client.query(query, values);
    const countResult = await client.query(countQuery, values.slice(0, -2));

      return {
        data: result.rows as Ticket[],
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      if (!this.client) client.release();
    }
  }

  async findById(id: number): Promise<TicketData | null> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `
        SELECT 
          t.id,
          json_build_object(
            'id', u.id,
            'name', u.name,
            'role', json_build_object('id', r_u.id, 'name', r_u.name, 'description', r_u.description)
          ) AS created_by,
          json_build_object(
            'id', c.id,
            'name', c.name,
            'document', ui.document,
            'phone', ui.phone
          ) AS client,
          t.assigned_role,
          json_build_object(
            'id', au.id,
            'name', au.name,
            'role', json_build_object('id', r_au.id, 'name', r_au.name, 'description', r_au.description)
          ) AS assigned_user,
          json_build_object(
            'id', tr.id,
            'category_id', tr.category_id,
            'type', tr.type_recipient,
            'reason', tr.reason,
            'description', tr.description,
            'expired_at', tr.expired_at,
            'type_recipient', tr.type_recipient,
            'recipient', tr.recipient
          ) AS reason,
          t.status,
          t.created_at,
          t.chain_id_main,
          t.chain_id_last
        FROM tickets t
        JOIN users u ON t.created_by = u.id
        LEFT JOIN roles r_u ON u.role_id = r_u.id
        LEFT JOIN clients c ON t.client_id = c.id
        LEFT JOIN userinfo ui ON ui.user_id = c.id 
        LEFT JOIN users au ON t.assigned_user = au.id
        LEFT JOIN roles r_au ON au.role_id = r_au.id
        JOIN ticket_reasons tr ON t.reason_id = tr.id
        WHERE t.id = $1
        LIMIT 1
        `,
        [id]
      );

      return result.rows[0] ?? null;
    } finally {
      if (!this.client) client.release();
    }
  }

  async updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket> {
    const client = await this.getClient();
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
      if (!this.client) client.release();
    }
  }

  async createTicketComment(data: TicketComment): Promise<TicketComment> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `INSERT INTO ticket_comments (ticket_id, author, message)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [data.ticket_id, data.author, data.message]
      );
      return result.rows[0] as TicketComment;
    } finally {
      if (!this.client) client.release();
    }
  }

  async findTicketCommentsById(ticket_id: number): Promise<TicketComment[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM ticket_comments WHERE ticket_id = $1 ORDER BY date DESC`,
        [ticket_id]
      );
      return result.rows as TicketComment[];
    } finally {
      if (!this.client) client.release();
    }
  }

  async findTicketReasonByCategoryId(
    category_id: number
  ): Promise<TicketReason[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `
        SELECT 
          id,
          category_id,
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
      return result.rows as TicketReason[];
    } finally {
      if (!this.client) client.release();
    }
  }

  async findTicketReasonById(id: number): Promise<TicketReason | null> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `
        SELECT 
          id,
          category_id,
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
      if (!this.client) client.release();
    }
  }

  async findReplyReasonsByReasonId(
    reason_id: number
  ): Promise<FinalizationReply[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT id, reason_id AS "reason_id", reply, comment
         FROM reply_reasons
         WHERE reason_id = $1`,
        [reason_id]
      );
      return result.rows as FinalizationReply[];
    } finally {
      if (!this.client) client.release();
    }
  }

  async findReplyReasonsActionsByReplyId(
    replyId: number
  ): Promise<ReplyAction[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT id, reply_id AS "reply_id", action_type_id, data_email, data_new_ticket_reason_id, data_new_ticket_assign_role
         FROM reply_actions
         WHERE reply_id = $1`,
        [replyId]
      );
      return result.rows as ReplyAction[];
    } finally {
      if (!this.client) client.release();
    }
  }
}
