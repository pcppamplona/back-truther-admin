import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { verifyJwt } from '../../middlewares/verify-jwt'
import { listPixOutPaginatedController } from '../../controllers/transactions/list-pix-out-controller'
import { listPixInPaginatedController } from '../../controllers/transactions/list-pix-in-controller'
import {
  listPixOutQuerySchema,
  listPixInQuerySchema,
  paginatedPixOutResponseSchema,
  paginatedPixInResponseSchema,
} from '../../schemas/transactions.schema'

export async function transactionsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/transactions/pix-out',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Transactions'],
        summary: 'List Pix Out transactions with filters (requires authentication)',
        querystring: listPixOutQuerySchema,
        response: {
          200: paginatedPixOutResponseSchema,
        },
      },
    },
    listPixOutPaginatedController,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/transactions/pix-in',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Transactions'],
        summary: 'List Pix In transactions with filters (requires authentication)',
        querystring: listPixInQuerySchema,
        response: {
          200: paginatedPixInResponseSchema,
        },
      },
    },
    listPixInPaginatedController,
  )
}
