import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { listUserInfoController } from '../controllers/list-user-info-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function listUserInfoRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/userinfo',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'List all user info (requires authentication)',
      },
    },
    listUserInfoController
  )
}
