import type { CreateUser, User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { PostgresDatabase } from '../../pg/connection'

export class PgUserRepository implements UsersRepository {
  async findByUsername(username: string): Promise<User | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query<User>(
        `
        SELECT
          id,
          uuid,
          name,
          username,
          password_hash AS "passwordHash",
          active,
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          deleted_at AS "deletedAt",
          force_reset_pwd AS "forceResetPwd",
          type_auth AS "typeAuth"
        FROM users
        WHERE username = $1 AND deleted_at IS NULL
        LIMIT 1
        `,
        [username],
      )
      if (result.rowCount === 0) return null
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async create(data: CreateUser): Promise<{ id: number }> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query<{ id: number }>(
        `
        INSERT INTO users (
          uuid, name, username, password_hash, active, force_reset_pwd, type_auth
        ) VALUES (
          COALESCE($1, gen_random_uuid()), $2, $3, $4, COALESCE($5, true), COALESCE($6, false), COALESCE($7, 'local')
        )
        RETURNING id
        `,
        [
          data.uuid ?? null,
          data.name,
          data.username,
          data.passwordHash,
          data.active ?? true,
          data.forceResetPwd ?? false,
          data.typeAuth ?? 'local',
        ],
      )
      return { id: result.rows[0].id }
    } finally {
      client.release()
    }
  }
}
