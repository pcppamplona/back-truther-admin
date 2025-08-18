import { PostgresDatabase } from '../../pg/connection'
import type { Clients } from '@/domain/clients/model/clients'
import type { ClientsRepository } from '@/domain/clients/repositories/clients-repository'

export class PgClientsRepository implements ClientsRepository {
  async findAll(): Promise<Clients[]> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM clients ORDER BY created_at DESC`
      )
      return result.rows
    } finally {
      client.release()
    }
  }

  async findByUuid(uuid: string): Promise<Clients | null> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM clients WHERE uuid = $1 LIMIT 1`,
        [uuid]
      )
      if (result.rowCount === 0) return null
      return result.rows[0]
    } finally {
      client.release()
    }
  }
}
