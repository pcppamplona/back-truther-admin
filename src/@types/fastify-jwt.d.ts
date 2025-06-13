import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    generateJwt: (payload: Record<string, unknown>) => string
  }

  interface FastifyRequest {
    correlationId?: string // ID único gerado para cada req
    startTime?: [number, number] // valor atribuído no runtime -> process.hrtime()
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      role: 'ADMIN' | 'CONSUMER'
    }
    user: {
      sub: string
      role: 'ADMIN' | 'CONSUMER'
      iat: number
      exp: number
    }
  }
}
