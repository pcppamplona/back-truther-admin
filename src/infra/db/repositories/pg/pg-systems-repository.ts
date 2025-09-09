import { PostgresDatabase } from '../../pg/connection'
import { System } from '@/domain/systems/model/system'
import { CreateSystemData, SystemsRepository } from '@/domain/systems/repositories/systems-repository'
import { SystemMapper } from '../../mappers/system-mapper'

export class PgSystemsRepository implements SystemsRepository {
  async create(data: CreateSystemData): Promise<System> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `INSERT INTO systems (name, description) VALUES ($1, $2) RETURNING *`,
        [data.name, data.description]
      )
      const system = SystemMapper.toSystem(result.rows[0])
      if (!system) {
        throw new Error('Failed to create system')
      }
      return system
    } finally {
      client.release()
    }
  }

  async findAll(): Promise<System[]> {
    const client = await PostgresDatabase.getClient()
    try {
      const result = await client.query(
        `SELECT * FROM systems ORDER BY created_at DESC`
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
}