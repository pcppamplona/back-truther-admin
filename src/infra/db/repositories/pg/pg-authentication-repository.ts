import { Pool } from 'pg'
import { Authentication } from '@/domain/user/model/authentication'
import { AuthRepository } from '@/domain/user/repositories/auth-repository'

export class PgAuthenticationRepository implements AuthRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: Authentication): Promise<void> {
    await this.pool.query(
      `
      INSERT INTO authentication 
      (uuid, name, username, password, active, force_reset_pwd, type_auth, group_level) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        data.uuid,
        data.name,
        data.username,
        data.password,
        data.active,
        data.forceResetPwd,
        data.typeAuth,
        data.groupLevel,
      ]
    )
  }

  async findAll(): Promise<Authentication[]> {
    const result = await this.pool.query(`
      SELECT 
        id, uuid, name, username, password, active, 
        created_at AS "createdAt", 
        updated_at AS "updateAt", 
        deleted_at AS "deleteAt", 
        force_reset_pwd AS "forceResetPwd", 
        type_auth AS "typeAuth", 
        group_level AS "groupLevel"
      FROM authentication
      WHERE deleted_at IS NULL
    `)

    return result.rows
  }

  async findByUsername(username: string): Promise<Authentication | null> {
    const result = await this.pool.query(
      `
      SELECT 
        id, uuid, name, username, password, active, 
        created_at AS "createdAt", 
        updated_at AS "updateAt", 
        deleted_at AS "deleteAt", 
        force_reset_pwd AS "forceResetPwd", 
        type_auth AS "typeAuth", 
        group_level AS "groupLevel"
      FROM authentication
      WHERE username = $1 AND deleted_at IS NULL
      LIMIT 1
      `,
      [username]
    )

    if (result.rowCount === 0) {
      return null
    }

    return result.rows[0]
  }
}
