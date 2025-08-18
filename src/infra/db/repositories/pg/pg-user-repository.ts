import type { User } from "@/domain/user/model/user";
import type { UsersRepository } from "@/domain/user/repositories/user-repository";

import { PostgresDatabase } from "../../pg/connection";

export class PgUserRepository implements UsersRepository {
  async findByName(username: string): Promise<User | null> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT 
           id,
           username,
           password,
           group_level AS "groupLevel",
           created_at AS "createdAt"
         FROM users
         WHERE username = $1
         LIMIT 1`,
        [username]
      );

      if (result.rowCount === 0) return null;

      return result.rows[0];
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
      return result.rows;
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

      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }
}
