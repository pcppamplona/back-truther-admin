import { Pool, PoolClient } from 'pg'

import { BadRequestError } from '@/errors/bad-request-error'
import { env } from '@/infra/env'
import { logger } from '@/infra/logger'

export class PostgresDatabase {
  private static pools = new Map<string, Pool>()

  static async connect(
    connectionString: string,
    name = 'default',
  ): Promise<void> {
    if (this.pools.has(name)) return

    try {
      const pool = new Pool({
        connectionString,
        ssl:
          env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
      })

      await pool.query('SELECT 1') // teste de conexão

      this.pools.set(name, pool)

      // Evita logar a connection string (pode conter credenciais)
      const host = safeHostFromConnectionString(connectionString)
      logger.info(`PostgreSQL "${name}" conectado${host ? ` em ${host}` : ''}`)
    } catch (err) {
      logger.error(`Erro ao conectar no PostgreSQL "${name}":`, err)
      process.exit(1)
    }
  }

  static async connectMany(
    connections: Record<string, string | undefined>,
  ): Promise<void> {
    const entries = Object.entries(connections).filter(
      ([_name, cs]): cs is string => Boolean(cs),
    )
    await Promise.all(entries.map(([name, cs]) => this.connect(cs, name)))
  }

  static getPool(name = 'default'): Pool {
    const pool = this.pools.get(name)
    if (!pool) {
      throw new BadRequestError(
        `PostgresDatabase("${name}") não conectado. Chame connect() primeiro.`,
      )
    }
    return pool
  }

  static async getClient(name = 'default'): Promise<PoolClient> {
    return this.getPool(name).connect()
  }

  static async close(name = 'default'): Promise<void> {
    const pool = this.pools.get(name)
    if (pool) {
      await pool.end()
      this.pools.delete(name)
      logger.info(`PostgreSQL "${name}" desconectado`)
    }
  }

  static async closeAll(): Promise<void> {
    await Promise.all(
      Array.from(this.pools.entries()).map(async ([name, pool]) => {
        await pool.end()
        logger.info(`PostgreSQL "${name}" desconectado`)
      }),
    )
    this.pools.clear()
  }
}

function safeHostFromConnectionString(cs: string): string | null {
  try {
    const u = new URL(cs)
    return u.host || null
  } catch {
    return null
  }
}
