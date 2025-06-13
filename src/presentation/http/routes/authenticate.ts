import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { authenticateController } from '../controllers/authenticate-controller'
import {
  authenticateInputSchema,
  authenticateOutputSchema,
} from '../schemas/authenticate.schema'

export async function authenticateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/authenticate',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate user',
        body: authenticateInputSchema,
        response: {
          200: authenticateOutputSchema,
        },
      },
    },
    authenticateController,
  )
}
