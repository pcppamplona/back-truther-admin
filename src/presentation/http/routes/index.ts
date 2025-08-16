import { FastifyInstance } from 'fastify'

import { authenticateUser } from './authenticate'
import { clientsRoutes } from './clients'
import { createUser } from './create-user'
import { healthCheck } from './health-check'
import { userItemsRoutes } from './user-items'
import { userTrutherRoutes } from './user-truther/user-truther'
import { userinfoRoutes } from './userinfo'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthCheck)
  await app.register(createUser)
  await app.register(userItemsRoutes)

  await app.register(authenticateUser)

  await app.register(clientsRoutes)
  await app.register(userinfoRoutes)

  await app.register(userTrutherRoutes)
}
