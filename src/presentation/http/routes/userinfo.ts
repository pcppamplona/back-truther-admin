import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { verifyJwt } from '../middlewares/verify-jwt'

import { listUserInfoController } from '../controllers/list-user-info-controller'
import { getUserInfoByUserIdController } from '../controllers/get-user-info-by-userid-controller'
import { getUserInfoByDocumentController } from '../controllers/get-user-info-by-document-controller'

import { z } from 'zod'

export async function userinfoRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/userinfo',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'List all user info (requires authentication)',
      },
    },
    listUserInfoController,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/userinfo/by-user/:user_id',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'Get user info by user_id (requires authentication)',
        params: z.object({
          user_id: z.string().regex(/^\d+$/, 'user_id must be a number'),
        }),
      },
    },
    getUserInfoByUserIdController,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/userinfo/by-document/:document',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'Get user info by document (requires authentication)',
        params: z.object({
          document: z.string().min(1),
        }),
      },
    },
    getUserInfoByDocumentController,
  )
}
