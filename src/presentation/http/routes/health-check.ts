import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { loggerService } from '@/infra/logger/logger-service'

export async function healthCheck(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/health', (request: FastifyRequest, reply: FastifyReply) => {
      loggerService.http({
        message: 'Health Check Request',
        meta: {
          statusCode: 200,
          method: request.method,
          url: request.url,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        },
      })

      return reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(), // tempo de execução em segundos
        timestamp: new Date().toISOString(),
      })
    })
}
