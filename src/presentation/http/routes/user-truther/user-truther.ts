import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { SetDecisionKycController } from '../../controllers/user-truther/set-decision-kyc-controller'
import { getUsersTrutherWithWalletsController } from '../../controllers/user-truther/get-paginated-users-with-wallets-controller'
import { getUserTrutherByIdController } from '../../controllers/user-truther/get-user-detailed-info-controller'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { setKycDecisionInputSchema } from '../../schemas/set-decision-kyc.schema'

export async function userTrutherRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users-truther/kyc-decision',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'Set KYC decision for a user (requires authentication)',
        body: setKycDecisionInputSchema,
      },
    },
    SetDecisionKycController,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users-truther',
    {
      preHandler: [verifyJwt()]
    },
    getUsersTrutherWithWalletsController
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users-truther/:userId',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['UserInfo'],
        summary: 'Get detailed information for a specific user (requires authentication)'
      }
    },
    getUserTrutherByIdController
  )
}
