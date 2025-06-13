import type { CreateUser, User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'

import { PostgresDatabase } from '../../pg/connection'

export class PgUserRepository implements UsersRepository {
  async findByName(name: string): Promise<User | null> {
    const client = await PostgresDatabase.getClient()

    try {
      const result = await client.query(
        `SELECT id, name, password_hash AS "passwordHash", created_at AS "createdAt"
         FROM users
         WHERE name = $1
         LIMIT 1`,
        [name],
      )

      if (result.rowCount === 0) return null

      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async create(user: CreateUser): Promise<{ id: string }> {
    const client = await PostgresDatabase.getClient()

    try {
      const result = await client.query(
        `INSERT INTO users (name, password_hash)
         VALUES ($1, $2)
         RETURNING id`,
        [user.name, user.passwordHash],
      )

      return { id: result.rows[0].id }
    } finally {
      client.release()
    }
  }
}
