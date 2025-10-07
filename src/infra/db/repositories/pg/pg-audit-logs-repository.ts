import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";
import { AuditLog } from "@/domain/audit-logs/model/audit-log";
import { AuditLogPaginationParams } from "@/domain/audit-logs/model/audit-log-pagination-params";
import {
  AuditLogsRepository,
  CreateAuditLogData,
} from "@/domain/audit-logs/repositories/audit-logs-repository";
import { AuditLogMapper } from "../../mappers/audit-log-mapper";
import { PaginatedResult } from "@/shared/pagination";

type EntityNameMap = Record<string, string>;

const USER_TYPE = "USER";
const USER_FALLBACK_LABEL = "User";
const SYSTEM_FALLBACK_LABEL = "System";

type IdBuckets = {
  userSenderIds: Set<string>;
  systemSenderIds: Set<string>;
  userTargetIds: Set<string>;
  systemTargetIds: Set<string>;
  externalUserIds: Set<string>;
};

export class PgAuditLogsRepository implements AuditLogsRepository {
  async create(data: CreateAuditLogData): Promise<AuditLog> {
    const client = await PostgresDatabase.getClient();

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
          target_id,
          target_external_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          data.method,
          data.action,
          data.message,
          data.description || null,
          data.sender_type,
          data.sender_id,
          data.target_type,
          data.target_id,
          data.target_external_id || null,
        ]
      );
      const [row] = result.rows;
      const auditLog = AuditLogMapper.toAuditLog(row);

      if (!auditLog) {
        throw new Error("Falha ao criar log de auditoria");
      }

      return auditLog;
    } finally {
      client.release();
    }
  }

  private async fetchEntityNames(
    client: PoolClient,
    table: "users" | "systems",
    nameColumn: "username" | "name",
    ids: Iterable<string>
  ): Promise<EntityNameMap> {
    const normalizedIds = Array.from(ids).filter(Boolean);
    const uniqueIds = Array.from(new Set(normalizedIds));

    if (uniqueIds.length === 0) {
      return {};
    }

    const placeholders = uniqueIds
      .map((_, index) => `$${index + 1}`)
      .join(", ");
    const query = `SELECT id, ${nameColumn} AS name FROM ${table} WHERE id IN (${placeholders})`;
    const result = await client.query(query, uniqueIds);

    return result.rows.reduce<EntityNameMap>((acc, row) => {
      acc[row.id] = row.name;
      return acc;
    }, {});
  }

  private collectIdBuckets(auditLogs: AuditLog[]): IdBuckets {
    const buckets: IdBuckets = {
      userSenderIds: new Set<string>(),
      systemSenderIds: new Set<string>(),
      userTargetIds: new Set<string>(),
      systemTargetIds: new Set<string>(),
      externalUserIds: new Set<string>(),
    };

    auditLogs.forEach((log) => {
      if (log.sender_type === USER_TYPE) {
        buckets.userSenderIds.add(log.sender_id);
      } else {
        buckets.systemSenderIds.add(log.sender_id);
      }

      if (log.target_type === USER_TYPE) {
        buckets.userTargetIds.add(log.target_id);
      } else {
        buckets.systemTargetIds.add(log.target_id);
      }

      if (log.target_external_id) {
        buckets.externalUserIds.add(log.target_external_id);
      }
    });

    return buckets;
  }

  private getUserFallbackName(id: string): string {
    return `${USER_FALLBACK_LABEL} ${id}`;
  }

  private getSystemFallbackName(id: string): string {
    return `${SYSTEM_FALLBACK_LABEL} ${id}`;
  }

  private async enrichAuditLogs(
    client: PoolClient,
    auditLogs: AuditLog[]
  ): Promise<void> {
    if (auditLogs.length === 0) {
      return;
    }

    const {
      userSenderIds,
      systemSenderIds,
      userTargetIds,
      systemTargetIds,
      externalUserIds,
    } = this.collectIdBuckets(auditLogs);

    const userIds = [...userSenderIds, ...userTargetIds, ...externalUserIds];
    const systemIds = [...systemSenderIds, ...systemTargetIds];

    const [userNames, systemNames] = await Promise.all([
      this.fetchEntityNames(client, "users", "username", userIds),
      this.fetchEntityNames(client, "systems", "name", systemIds),
    ]);

    auditLogs.forEach((log) => {
      const senderIsUser = log.sender_type === USER_TYPE;
      const targetIsUser = log.target_type === USER_TYPE;

      log.sender_name = senderIsUser
        ? userNames[log.sender_id] || this.getUserFallbackName(log.sender_id)
        : systemNames[log.sender_id] ||
          this.getSystemFallbackName(log.sender_id);

      if (targetIsUser) {
        log.target_name =
          userNames[log.target_id] || this.getUserFallbackName(log.target_id);
        return;
      }

      const baseTargetName =
        systemNames[log.target_id] || this.getSystemFallbackName(log.target_id);
      const externalUserName = log.target_external_id
        ? userNames[log.target_external_id]
        : undefined;

      log.target_name = externalUserName
        ? `${baseTargetName} (${externalUserName})`
        : baseTargetName;
    });
  }

  async findAll(): Promise<AuditLog[]> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT * FROM audit_logs ORDER BY created_at DESC`
      );
      const auditLogs = AuditLogMapper.toAuditLogList(result.rows);

      await this.enrichAuditLogs(client, auditLogs);

      return auditLogs;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<AuditLog | null> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT * FROM audit_logs WHERE id = $1 LIMIT 1`,
        [id]
      );

      if (result.rowCount === 0) {
        return null;
      }

      const auditLog = AuditLogMapper.toAuditLog(result.rows[0]);

      if (!auditLog) {
        return null;
      }

      await this.enrichAuditLogs(client, [auditLog]);

      return auditLog;
    } finally {
      client.release();
    }
  }

  async findPaginated(
    params: AuditLogPaginationParams
  ): Promise<PaginatedResult<AuditLog>> {
    const {
      page,
      limit,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
      action,
      method,
      sender_id,
      sender_type,
      target_id,
      target_type,
      target_external_id,
      created_after,
      created_before,
      description
    } = params;

    const client = await PostgresDatabase.getClient();
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
      "target_external_id",
    ];

    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";
    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`)
      where.push(`(message ILIKE $${values.length} OR method ILIKE $${values.length})`)
    }
    
    if (description) {
      values.push(`%${description}%`)
      where.push(`description ILIKE $${values.length}`)
    }

    if (action) {
      values.push(action);
      where.push(`action = $${values.length}`);
    }

    if (method) {
      values.push(method);
      where.push(`method = $${values.length}`);
    }

    if (sender_id) {
      values.push(sender_id);
      where.push(`sender_id = $${values.length}`);
    }

    if (sender_type) {
      values.push(sender_type);
      where.push(`sender_type = $${values.length}`);
    }

    if (target_id) {
      values.push(target_id);
      where.push(`target_id = $${values.length}`);
    }

    if (target_type) {
      values.push(target_type);
      where.push(`target_type = $${values.length}`);
    }

    if (target_external_id) {
      values.push(target_external_id);
      where.push(`target_external_id = $${values.length}`);
    }

    if (created_after) {
      values.push(created_after);
      where.push(`created_at >= $${values.length}`);
    }

    if (created_before) {
      values.push(created_before);
      where.push(`created_at <= $${values.length}`);
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
      const auditLogs = AuditLogMapper.toAuditLogList(result.rows);

      await this.enrichAuditLogs(client, auditLogs);

      return {
        data: auditLogs,
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      client.release();
    }
  }

  async findByTicketId(ticket_id: number): Promise<AuditLog[] | null> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `
      SELECT *
      FROM audit_logs
      WHERE action = 'crm'
        AND target_external_id = $1
      ORDER BY created_at DESC
      `,
        [String(ticket_id)]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const auditLogs = AuditLogMapper.toAuditLogList(result.rows);

      await this.enrichAuditLogs(client, auditLogs);

      return auditLogs;
    } finally {
      client.release();
    }
  }
}
