import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { env } from '@/infra/env'
import { loggerService } from '@/infra/logger/logger-service'

import { PostgresDatabase } from './connection'

export async function runPostgresMigrations() {
  await PostgresDatabase.connect(env.DATABASE_URL)

  const pool = PostgresDatabase.getPool()
  const client = await pool.connect()

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        run_at TIMESTAMP DEFAULT NOW()
      )
    `)

    const applied = await client.query('SELECT name FROM _migrations')
    const appliedNames = new Set(applied.rows.map((r) => r.name))

    const dir = join(process.cwd(), 'src/infra/db/pg/migrations')

    const files = readdirSync(dir).sort()

    for (const file of files) {
      if (appliedNames.has(file)) {
        loggerService.db({ message: `Migration already applied: ${file}` })
        continue
      }

      const sql = readFileSync(join(dir, file), 'utf-8')

      const statements = sql
        .split(/;\s*$/gm)
        .map((stmt) => stmt.trim())
        .filter(Boolean)

      if (statements.length === 0) {
        loggerService.db({ message: `Skipping empty migration: ${file}` })
        continue
      }

      try {
        await client.query('BEGIN')

        for (const statement of statements) {
          await client.query(statement)
        }

        await client.query('INSERT INTO _migrations (name) VALUES ($1)', [file])

        await client.query('COMMIT')

        loggerService.db({ message: `✅ Successfully applied: ${file}` })
      } catch (err) {
        await client.query('ROLLBACK')
        loggerService.error({
          message: `❌ Error in migration file: ${file}`,
          meta: { error: err },
        })
        throw err
      }
    }

    loggerService.db({ message: 'All migrations completed.' })
  } catch (err) {
    loggerService.error({
      message: '❌ Migration process failed.',
      meta: { error: err },
    })
    process.exit(1)
  } finally {
    client.release()
  }
}

runPostgresMigrations()
