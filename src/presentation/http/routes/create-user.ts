import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { CreateUserController } from '../controllers/create-user-controller'
// import { verifyJwt } from '../middlewares/verify-jwt'
import {
  createUserInputSchema,
  createUserOutputSchema,
} from '../schemas/create-user.schema'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['User'],
        summary: 'Create a new user',
        security: [{ bearerAuth: [] }],
        body: createUserInputSchema,
        response: {
          201: createUserOutputSchema,
        },
      },
      // preHandler: [verifyJwt()], // Para rotas com autenticação
    },
    CreateUserController,
  )
}
