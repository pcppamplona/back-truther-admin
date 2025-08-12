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
}
