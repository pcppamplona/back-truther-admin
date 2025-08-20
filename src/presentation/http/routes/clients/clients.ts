import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { listClientsController } from '../../controllers/clients/list-clients-controller'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { listClientsPaginatedController } from '../../controllers/clients/list-clients-paginated-controller'
import { listClientsPaginatedQuerySchema } from '../../schemas/clients.schema'
import { getClientByUuidController } from '../../controllers/clients/get-client-by-uuid-controller'

export async function clientsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/clients',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Clients'],
        summary: 'List all clients (requires authentication)',
      },
    },
    listClientsController
  ),
   app.withTypeProvider<ZodTypeProvider>().get(
    '/clients/:uuid',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Clients'],
        summary: 'List client by uuid (requires authentication)',
      },
    },
    getClientByUuidController
  ),
  app.withTypeProvider<ZodTypeProvider>().get(
    "/clients/paginated",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Clients"],
        summary: "List clients with pagination (requires authentication)",
        querystring: listClientsPaginatedQuerySchema,
      },
    },
    listClientsPaginatedController
  )
}
