import type { FastifyRequest } from 'fastify'

import { env } from '../env'
import { logger } from '.'

interface LogParams {
  message: string
  meta?: Record<string, unknown>
}

interface LogHttpErrorParams {
  name: string
  error: Error
  request: FastifyRequest
  statusCode: number
}

export class LoggerService {
  private formatRequestMeta(request: FastifyRequest) {
    return {
      id: request.id,
      correlationId: request.correlationId,
      ip: request.ip,
      user: request.user,
      method: request.method,
      url: request.url,
    }
  }

  private formatMeta(meta?: Record<string, unknown>, category?: string) {
    return {
      service: env.SERVICE_LOG_NAME,
      environment: env.NODE_ENV,
      ...(category ? { category } : {}),
      ...(meta || {}),
    }
  }

  info({ message, meta }: LogParams) {
    logger.info(message, this.formatMeta(meta))
  }

  warn({ message, meta }: LogParams) {
    logger.warn(message, this.formatMeta(meta))
  }

  error({ message, meta }: LogParams) {
    logger.error(message, this.formatMeta(meta))
  }

  http({ message, meta }: LogParams) {
    logger.info(message, this.formatMeta(meta, 'http'))
  }

  db({ message, meta }: LogParams) {
    logger.info(message, this.formatMeta(meta, 'db'))
  }

  logHttpError({ name, error, request, statusCode }: LogHttpErrorParams) {
    logger.error(name, {
      ...this.formatRequestMeta(request),
      ...this.formatMeta(),
      statusCode,
      errorStack: error.stack,
    })
  }
}

export const loggerService = new LoggerService()
