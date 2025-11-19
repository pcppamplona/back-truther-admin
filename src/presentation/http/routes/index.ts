import { FastifyInstance } from 'fastify'

import { authenticateUser } from './authenticate'
import { auditLogsRoutes } from './audit-logs/audit-logs'
import { clientsRoutes } from './clients/clients'
import { healthCheck } from './health-check'
import { systemsRoutes } from './systems/systems'
import { userTrutherRoutes } from './user-truther/user-truther'
import { userinfoRoutes } from './userinfo'
import { usersRoutes } from "./users/users"
import { meRoute } from "./users/me"
import { ticketsRoutes } from './tickets/tickets'
import { ticketReasonRoutes } from './ticket-reasons/ticket-reasons'
import { transactionsRoutes } from './transactions/transactions'
import { servicesRoutes } from './block-levels/block-levels'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthCheck)

  await app.register(authenticateUser)

  await app.register(meRoute)
  await app.register(usersRoutes)
  await app.register(clientsRoutes)
  await app.register(userinfoRoutes)
  await app.register(auditLogsRoutes)
  await app.register(systemsRoutes)

  await app.register(userTrutherRoutes)

  await app.register(ticketsRoutes)
  await app.register(ticketReasonRoutes)
  await app.register(transactionsRoutes)
  await app.register(servicesRoutes)
}
