import type { User } from "@/domain/user/model/user";
import type { PaginationParams, PaginatedResult, UsersRepository } from "@/domain/user/repositories/user-repository";

import { PostgresDatabase } from '../../pg/connection'
import { AdminUserMapper } from '../../mappers/admin-user-mapper'

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

      if (result.rowCount === 0) return null

      return AdminUserMapper.toUser(result.rows[0])
    } finally {
      client.release()
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
  
  async findAllPaginated({ page, limit }: PaginationParams): Promise<PaginatedResult<User>> {
    const client = await PostgresDatabase.getClient();
    try {
      // Calculate offset based on page and limit
      const offset = (page - 1) * limit;
      
      // Get total count of users
      const countResult = await client.query('SELECT COUNT(*) FROM users');
      const total = parseInt(countResult.rows[0].count, 10);
      
      // Get paginated users
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
          FROM users
          ORDER BY id
          LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      
      // Calculate total pages
      const totalPages = Math.ceil(total / limit);
      
      return {
        data: AdminUserMapper.toUserList(result.rows),
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
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
      )

      if (result.rowCount === 0) return null
      return AdminUserMapper.toUser(result.rows[0])
    } finally {
      client.release()
    }
  }
}
