import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { loggerService } from '@/infra/logger/logger-service'
import { ErrorMapperService } from '@/infra/validation/error-mapper-service'
import {
  formatFastifyValidationError,
  formatZodError,
} from '@/infra/validation/validation-error-formatter'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  const swaggerAuthErrorMEsg =
    error.message === 'Unauthorized swagger' ||
    error.message === 'Missing or bad formatted authorization header'

  if (swaggerAuthErrorMEsg) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof ZodError) {
    const formatted = formatZodError(error)

    loggerService.logHttpError({
      name: 'Validation schema error',
      error,
      request,
      statusCode: 400,
    })

    return reply.status(400).send(formatted)
  }

  if (error.code === 'FST_ERR_VALIDATION' && Array.isArray(error.validation)) {
    const formatted = formatFastifyValidationError(error.validation)

    loggerService.logHttpError({
      name: 'Fastify validation error',
      error,
      request,
      statusCode: 400,
    })

    return reply.status(400).send(formatted)
  }

  const { statusCode, message } = ErrorMapperService.map(error)

  loggerService.logHttpError({
    name: error.name || 'Unhandled error',
    error,
    request,
    statusCode,
  })

  return reply.status(statusCode).send({ message })
}
