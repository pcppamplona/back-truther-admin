import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { SetDecisionKycController } from '../../controllers/user-truther/set-decision-kyc-controller'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { setKycDecisionInputSchema } from '../../schemas/set-decision-kyc.schema'

export async function userTrutherRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/userinfo/kyc-decision',
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
}
