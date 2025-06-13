import { DatabaseError } from 'pg'

import { BadRequestError } from '@/errors/bad-request-error'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { UnauthorizedError } from '@/errors/unauthorized-error'

import { loggerService } from '../logger/logger-service'

interface MappedError {
  statusCode: number
  message: string
}

export class ErrorMapperService {
  static map(error: unknown): MappedError {
    if (error instanceof BadRequestError) {
      return {
        statusCode: 400,
        message: error.message,
      }
    }

    if (error instanceof InvalidCredentialsError) {
      return {
        statusCode: 401,
        message: error.message,
      }
    }

    if (error instanceof UnauthorizedError) {
      return {
        statusCode: 401,
        message: error.message,
      }
    }

    if (error instanceof DatabaseError) {
      loggerService.db({
        message: '[POSTGRES ERROR]',
        meta: {
          code: error.code,
          detail: error.detail,
          table: error.table,
          column: error.column,
          constraint: error.constraint,
          message: error.message,
        },
      })

      console.log(error, 'DATABASE ERROR')

      const message =
        error.code === '23505'
          ? 'Registro duplicado no banco de dados.'
          : 'Erro interno no banco de dados.'

      return {
        statusCode: 500,
        message,
      }
    }

    return {
      statusCode: 500,
      message: 'Internal server error',
    }
  }
}
