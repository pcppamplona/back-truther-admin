import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { listClientsController } from '../controllers/list-clients-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function listClientsRoute(app: FastifyInstance) {
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
  )
}
