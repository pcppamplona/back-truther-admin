import { FastifyRequest } from 'fastify'

import { UnauthorizedError } from '@/errors/unauthorized-error'

export function verifyJwt() {
  return async (request: FastifyRequest) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw new UnauthorizedError()
    }
  }
}
