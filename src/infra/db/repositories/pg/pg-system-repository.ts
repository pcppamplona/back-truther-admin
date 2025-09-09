import { PostgresDatabase } from '../../pg/connection'
import { System } from '@/domain/system/model/system'
import { CreateSystemData, SystemRepository, UpdateSystemData } from '@/domain/system/repositories/system-repository'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'
import { SystemMapper } from '../../mappers/system-mapper'

export class PgSystemRepository implements SystemRepository {
  async create(data: CreateSystemData): Promise<System> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `INSERT INTO systems (
          name, 
          description
        ) VALUES ($1, $2) RETURNING *`,
        [
          data.name,
          data.description
        ]
      )
      return SystemMapper.toSystem(result.rows[0])!
    } finally {
      client.release()
    }
  }

  async findAll(): Promise<System[]> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM systems ORDER BY id ASC`
      )
      return SystemMapper.toSystemList(result.rows)
    } finally {
      client.release()
    }
  }

  async findById(id: number): Promise<System | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM systems WHERE id = $1 LIMIT 1`,
        [id]
      )
      if (result.rowCount === 0) return null
      return SystemMapper.toSystem(result.rows[0])
    } finally {
      client.release()
    }
  }

  async update(id: number, data: UpdateSystemData): Promise<System | null> {
    const client = await PostgresDatabase.getClient()
    try {
      // Build the SET part of the query dynamically based on provided data
      const updates: string[] = []
      const values: any[] = []
      
      if (data.name !== undefined) {
        values.push(data.name)
        updates.push(`name = $${values.length}`)
      }
      
      if (data.description !== undefined) {
        values.push(data.description)
        updates.push(`description = $${values.length}`)
      }
      
      // If no updates, return the existing system
      if (updates.length === 0) {
        const existingSystem = await this.findById(id)
        return existingSystem
      }
      
      // Add the id as the last parameter
      values.push(id)
      
      const result = await client.query(
        `UPDATE systems SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`,
        values
      )
      
      if (result.rowCount === 0) return null
      return SystemMapper.toSystem(result.rows[0])
    } finally {
      client.release()
    }
  }

  async delete(id: number): Promise<void> {
    const client = await PostgresDatabase.getClient()
    try {
      await client.query(
        `DELETE FROM systems WHERE id = $1`,
        [id]
      )
    } finally {
      client.release()
    }
  }

  async findPaginated(
    params: PaginationParams
  ): Promise<PaginatedResult<System>> {
    const {
      page,
      limit,
      search,
      sortBy = "id",
      sortOrder = "ASC",
    } = params;
    const client = await PostgresDatabase.getClient();

    const offset = (page - 1) * limit;

    const allowedSortBy = [
      "id",
      "name"
    ];
    const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "id";

    const safeSortOrder = sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(name ILIKE $${values.length} OR description ILIKE $${values.length})`
      );
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    try {
      const query = `
      SELECT * FROM systems
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

      const countQuery = `
      SELECT COUNT(*)::int AS total FROM systems
      ${whereClause}
    `;

      const result = await client.query(query, [...values, limit, offset]);
      const countResult = await client.query(countQuery, values);

      return {
        data: SystemMapper.toSystemList(result.rows),
        total: Number(countResult.rows[0].total),
        page,
        limit
      };
    } finally {
      client.release()
    }
  }
}