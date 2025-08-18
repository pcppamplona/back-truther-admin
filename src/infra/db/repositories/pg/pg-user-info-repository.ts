import { UserInfoRepository } from '@/domain/clients/repositories/user-info-repository'
import { PostgresDatabase } from '../../pg/connection'
import { UserInfo } from '@/domain/clients/model/userinfo'

export class PgUserInfoRepository implements UserInfoRepository {
  async findAll(): Promise<UserInfo[]> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM userinfo ORDER BY created_at DESC`
      )
      return result.rows
    } finally {
      client.release()
    }
  }

  async findByUserId(user_id: number): Promise<UserInfo | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM userinfo WHERE user_id = $1 LIMIT 1`,
        [user_id]
      )
      if (result.rowCount === 0) return null
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async findByDocument(document: string): Promise<UserInfo | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM userinfo WHERE document = $1 LIMIT 1`,
        [document]
      )
      if (result.rowCount === 0) return null
      return result.rows[0]
    } finally {
      client.release()
    }
  }
}
