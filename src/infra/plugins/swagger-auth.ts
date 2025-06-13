import fastifyBasicAuth from '@fastify/basic-auth'
import {
  FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'

import { env } from '../env'

const USERS = {
  [env.SWAGGER_USER]: env.SWAGGER_PASSWORD,
}

async function swaggerAuthPlugin(fastify: FastifyInstance) {
  function validate(
    username: string,
    password: string,
    _req: FastifyRequest,
    _reply: FastifyReply,
    done: (err?: Error) => void,
  ) {
    if (USERS[username] === password) {
      done()
    } else {
      done(new Error('Unauthorized swagger'))
    }
  }

  await fastify.register(fastifyBasicAuth, {
    validate,
    authenticate: true,
  })
}

export default fp(swaggerAuthPlugin, { name: 'swagger-auth-plugin' })
