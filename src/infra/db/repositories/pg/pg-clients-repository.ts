import { PostgresDatabase } from "../../pg/connection";
import type { Clients } from "@/domain/clients/model/clients";
import type { ClientsRepository } from "@/domain/clients/repositories/clients-repository";
import { PaginatedResult, PaginationParams } from "@/shared/pagination";
import { ClientsMapper } from "../../mappers/clients-mapper";
import { PoolClient } from "pg";

export class PgClientsRepository implements ClientsRepository {

  constructor(private client?: PoolClient) {}

  private async getClient(): Promise<PoolClient> {
    if (this.client) return this.client;       
    return PostgresDatabase.getClient();      
  }

  async findAll(): Promise<Clients[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `
      SELECT 
        c.*,
        u.document
      FROM clients c
      LEFT JOIN userinfo u ON u.user_id = c.id
      ORDER BY c.created_at DESC
      `
      );

      return ClientsMapper.toClientsList(result.rows);
    } finally {
      client.release();
    }
  }

  async findByUuid(uuid: string): Promise<Clients | null> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM clients WHERE uuid = $1 LIMIT 1`,
        [uuid]
      );
      if (result.rowCount === 0) return null;
      return ClientsMapper.toClients(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Clients | null> {
    const client = await this.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM clients WHERE id = $1 LIMIT 1`,
        [id]
      );
      if (result.rowCount === 0) return null;
      return ClientsMapper.toClients(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findPaginated(
    params: PaginationParams
  ): Promise<PaginatedResult<Clients>> {
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
      "name",
      "uuid",
      "role",
      "created_at",
      "kyc_approved",
    ];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";
    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(c.name ILIKE $${values.length} OR c.role ILIKE $${values.length} OR u.document ILIKE $${values.length})`
      );
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
       SELECT 
        c.id
        ,coalesce(c."name", u."name") as "name"
        ,c."role"
        ,c.is_verified
        ,c.can_transact
        ,c.status
        ,c.fee_level_id
        ,c.created_at
        ,c.updated_at
        ,c.flags
        ,c.expo_id
        ,c.kyc_approved
        ,c.kyc_risk
        ,c.banking_enable
        ,c.disinterest
        ,c.register_txid
        ,c.called_attempts_guenno
        ,c.stage_kyc
        ,c.comment_kyc
        ,c.provider_kyc
        ,c.attempts_kyc
        ,c."password"
        ,c.ip_create
        ,c."error"
        ,c."restrict"
        ,c.override_instant_pay
        ,c."uuid"
        ,c.last_login
        ,c.last_ip_login
        ,c.retry_kyc
        ,c.regenerate_kyc
        ,c.master_instant_pay
        ,u.document
      FROM clients c
      LEFT JOIN userinfo u ON u.user_id = c.id
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM clients c
      LEFT JOIN userinfo u ON u.user_id = c.id
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);

      return {
        data: ClientsMapper.toClientsList(result.rows), // agora inclui 'document'
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      client.release();
    }
  }
}
