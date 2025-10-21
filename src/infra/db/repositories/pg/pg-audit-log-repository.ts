import { PostgresDatabase } from "../../pg/connection";
import { AuditLog } from "@/domain/audit-log/model/audit-log";
import {
  AuditLogRepository,
  CreateAuditLogData,
} from "@/domain/audit-log/repositories/audit-log-repository";
import { PaginatedResult, PaginationParams } from "@/shared/pagination";
import { AuditLogMapper } from "../../mappers/audit-log-mapper";
import { PoolClient } from "pg";

export class PgAuditLogRepository implements AuditLogRepository {
  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;
    return PostgresDatabase.getClient();
  }

  async create(data: CreateAuditLogData): Promise<AuditLog> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `INSERT INTO audit_logs (
          method, 
          action, 
          message, 
          description, 
          sender_type, 
          sender_id, 
          target_type, 
          target_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          data.method,
          data.action,
          data.message,
          data.description,
          data.senderType,
          data.senderId,
          data.targetType,
          data.targetId,
        ]
      );
      return AuditLogMapper.toAuditLog(result.rows[0])!;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<AuditLog[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM audit_logs ORDER BY created_at DESC`
      );
      return AuditLogMapper.toAuditLogList(result.rows);
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<AuditLog | null> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM audit_logs WHERE id = $1 LIMIT 1`,
        [id]
      );
      if (result.rowCount === 0) return null;
      return AuditLogMapper.toAuditLog(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findPaginated(
    params: PaginationParams
  ): Promise<PaginatedResult<AuditLog>> {
    const {
      page,
      limit,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
    } = params;
    const client = await this.getClient();

    const offset = (page - 1) * limit;

    const allowedSortBy = [
      "id",
      "method",
      "action",
      "message",
      "created_at",
      "sender_type",
      "sender_id",
      "target_type",
      "target_id",
    ];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";

    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(message ILIKE $${values.length} OR action ILIKE $${values.length} OR method ILIKE $${values.length})`
      );
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
      SELECT * FROM audit_logs
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*)::int AS total FROM audit_logs
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);

      return {
        data: AuditLogMapper.toAuditLogList(result.rows),
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      client.release();
    }
  }
}
