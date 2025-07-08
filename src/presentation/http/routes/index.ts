import { FastifyInstance } from 'fastify'

import { authenticateUser } from './authenticate'
import { createUser } from './create-user'
import { healthCheck } from './health-check'
import { userItemsRoutes } from './user-items'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthCheck)
  await app.register(authenticateUser)
  await app.register(createUser)
  await app.register(userItemsRoutes)
}
