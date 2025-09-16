import type { User } from "@/domain/user/model/user";
import type {
  PaginationParams,
  PaginatedResult,
  UsersRepository,
} from "@/domain/user/repositories/user-repository";

import { PostgresDatabase } from "../../pg/connection";
import { AdminUserMapper } from "../../mappers/admin-user-mapper";

export class PgUserRepository implements UsersRepository {
  async findByName(username: string): Promise<User | null> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT 
           id,
           uuid,
           name,
           username,
           password,
           type_auth AS "typeAuth",
           group_level AS "groupLevel",
           created_at AS "createdAt"
         FROM users
         WHERE username = $1
         LIMIT 1`,
        [username]
      );

      if (result.rowCount === 0) return null;

      return AdminUserMapper.toUser(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<User[]> {
    const client = await PostgresDatabase.getClient();
    try {
      const result = await client.query(
        `SELECT
            id,
            uuid,
            name,
            username,
            password,
            active,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt",
            force_reset_pwd AS "forceResetPwd",
            type_auth AS "typeAuth",
            group_level AS "groupLevel"
          FROM users`
      );
      return AdminUserMapper.toUserList(result.rows);
    } finally {
      client.release();
    }
  }

async findPaginated(
  params: PaginationParams
): Promise<PaginatedResult<User>> {
  const { page, limit, search, sortBy = "id", sortOrder = "ASC" } = params;
  const client = await PostgresDatabase.getClient();

  const offset = (page - 1) * limit;

  const allowedSortBy = [
    "id",
    "uuid",
    "name",
    "username",
    "created_at",
    "updated_at",
    "group_level",
  ];
  const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "id";
  const safeSortOrder = sortOrder?.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const where: string[] = [];
  const values: any[] = [];

  if (search) {
    values.push(`%${search}%`);
    where.push(
      `(name ILIKE $${values.length} OR username ILIKE $${values.length})`
    );
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  try {
    const query = `
      SELECT
        id,
        uuid,
        name,
        username,
        password,
        active,
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        deleted_at AS "deletedAt",
        force_reset_pwd AS "forceResetPwd",
        type_auth AS "typeAuth",
        group_level AS "groupLevel"
      FROM users
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM users
      ${whereClause}
    `;

    const result = await client.query(query, [...values, limit, offset]);
    const countResult = await client.query(countQuery, values);

    return {
      data: AdminUserMapper.toUserList(result.rows),
      total: Number(countResult.rows[0].total),
      page,
      limit,
    };
  } finally {
    client.release();
  }
}

  async findById(id: number): Promise<User | null> {
    console.log("ID>>>", id);
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query<User>(
        `
          SELECT
            id,
            uuid,
            name,
            username,
            password,
            active,
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            deleted_at AS "deletedAt",
            force_reset_pwd AS "forceResetPwd",
            type_auth AS "typeAuth",
            group_level AS "groupLevel"
          FROM users
          WHERE id = $1
          LIMIT 1
        `,
        [id]
      );

      if (result.rowCount === 0) return null;
      return AdminUserMapper.toUser(result.rows[0]);
    } finally {
      client.release();
    }
  }
}
