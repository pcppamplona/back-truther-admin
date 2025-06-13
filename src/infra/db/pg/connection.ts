import { Pool, PoolClient } from 'pg'

import { BadRequestError } from '@/errors/bad-request-error'
import { env } from '@/infra/env'
import { logger } from '@/infra/logger'

export class PostgresDatabase {
  private static pool: Pool
  private static isConnected = false

  static async connect(connectionString: string): Promise<void> {
    if (this.isConnected) return

    try {
      this.pool = new Pool({
        connectionString,
        ssl:
          env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
      })
      await this.pool.query('SELECT 1') // teste de conexão

      this.isConnected = true
      logger.info('PostgreSQL connected successfully')
    } catch (err) {
      logger.error('Error to connect with PostgreSQL:', err)
      process.exit(1)
    }
  }

  static getPool(): Pool {
    if (!this.isConnected) {
      throw new BadRequestError(
        'PostgresDatabase not connected. Call connect() first.',
      )
    }

    return this.pool
  }

  static async getClient(): Promise<PoolClient> {
    return this.getPool().connect()
  }
}
