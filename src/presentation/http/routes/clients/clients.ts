import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { listClientsController } from '../../controllers/clients/list-clients-controller'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { listClientsPaginatedController } from '../../controllers/clients/list-clients-paginated-controller'
import { getClientByIdParamsSchema, listClientsPaginatedQuerySchema } from '../../schemas/clients.schema'
import { getClientByUuidController } from '../../controllers/clients/get-client-by-uuid-controller'
import { getClientByIdController } from '../../controllers/clients/get-client-by-id-controller'

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
    '/clients/by-uuid/:uuid',
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
    "/clients/by-id/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Clients"],
        summary: "Get client by ID (requires authentication)",
        params: getClientByIdParamsSchema,
      },
    },
    getClientByIdController
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
