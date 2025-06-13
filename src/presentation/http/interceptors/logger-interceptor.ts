import { randomUUID } from 'node:crypto'

import type { FastifyInstance } from 'fastify'

import { loggerService } from '@/infra/logger/logger-service'

export class LoggerInterceptor {
  static register(app: FastifyInstance) {
    app.addHook('onRequest', async (request) => {
      request.correlationId = randomUUID()

      request.startTime = process.hrtime()
    })

    app.addHook('onResponse', async (request, reply) => {
      if (request.startTime) {
        const diff = process.hrtime(request.startTime)
        const responseTimeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2)

        loggerService.http({
          message: 'Request finished',
          meta: {
            id: request.id,
            ip: request.ip,
            user: request.user,
            body: request.body,
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            responseTime: `${responseTimeMs}ms`,
          },
        })
      } else {
        loggerService.http({
          message: 'Request finished (no timing)',
          meta: {
            id: request.id,
            ip: request.ip,
            user: request.user,
            body: request.body,
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
          },
        })
      }
    })
  }
}
