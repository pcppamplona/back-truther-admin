import { PostgresDatabase } from "../../pg/connection";
import type { Clients } from "@/domain/clients/model/clients";
import type { ClientsRepository } from "@/domain/clients/repositories/clients-repository";
import { PaginatedResult, PaginationParams } from "@/shared/pagination";

export class PgClientsRepository implements ClientsRepository {
  async findAll(): Promise<Clients[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM clients ORDER BY created_at DESC`
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findByUuid(uuid: string): Promise<Clients | null> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM clients WHERE uuid = $1 LIMIT 1`,
        [uuid]
      );
      if (result.rowCount === 0) return null;
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<Clients | null> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT * FROM clients WHERE id = $1 LIMIT 1`,
        [id]
      );
      if (result.rowCount === 0) return null;
      return result.rows[0];
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
    const client = await PostgresDatabase.getClient();

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
        `(name ILIKE $${values.length} OR role ILIKE $${values.length})`
      );
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
      SELECT * FROM clients
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*) AS total FROM clients
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);

      return {
        data: result.rows,
        total: Number(countResult.rows[0].total),
        page,
        limit,
      };
    } finally {
      client.release();
    }
  }
}
