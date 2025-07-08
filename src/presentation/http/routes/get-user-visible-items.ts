import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { GetUserVisibleItemsController } from '../controllers/get-user-visible-items-controller'
import {
  getUserVisibleItemsInputSchema,
  getUserVisibleItemsOutputSchema,
} from '../schemas/get-user-visible-items.schema'

export async function getUserVisibleItems(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/items',
    {
      schema: {
        tags: ['User'],
        summary: 'Get visible items for user by group inheritance',
        params: getUserVisibleItemsInputSchema,
        response: {
          200: getUserVisibleItemsOutputSchema,
        },
      },
    },
    GetUserVisibleItemsController,
  )
}
