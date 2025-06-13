import { PostgresDatabase } from '@/infra/db/pg/connection'
import { env } from '@/infra/env'

import { loggerService } from '../../infra/logger/logger-service'
import { createApp } from './create-app'

async function main() {
  const app = await createApp()

  await app.ready()

  // Test db connection
  await PostgresDatabase.connect(env.DATABASE_URL)

  app
    .listen({ port: env.PORT, host: '0.0.0.0' })
    .then(() => {
      loggerService.info({ message: `HTTP server running at port ${env.PORT}` })
    })
    .catch((err) => {
      loggerService.error({
        message: 'Failed to start server',
        meta: { error: err },
      })
      process.exit(1)
    })

  const shutdown = async () => {
    loggerService.info({ message: 'Shutting down server...' })
    await app.close()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main()
