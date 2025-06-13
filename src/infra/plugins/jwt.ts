import fastifyJwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import * as fs from 'fs'
import jwt from 'jsonwebtoken'
import * as path from 'path'

async function jwtPlugin(fastify: FastifyInstance) {
  const privateKey = fs.readFileSync(
    path.resolve(process.cwd(), 'keys/private.pem'),
    'utf8',
  )
  const publicKey = fs.readFileSync(
    path.resolve(process.cwd(), 'keys/public.pem'),
    'utf8',
  )

  await fastify.register(fastifyJwt, {
    secret: {
      public: publicKey,
      private: privateKey,
    },
    sign: { algorithm: 'RS256' },
    verify: { algorithms: ['RS256'] },
  })

  fastify.decorate('generateJwt', (payload: Record<string, unknown>) => {
    return jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '10m',
    })
  })
}

export default fp(jwtPlugin, { name: 'jwt-plugin' })
