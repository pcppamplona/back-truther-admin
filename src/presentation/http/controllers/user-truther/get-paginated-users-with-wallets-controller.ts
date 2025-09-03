import { makeGetUsersTrutherWithWalletsUseCase } from '@/application/factories/user-truther/make-get-paginated-users-with-wallets'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const getUsersTrutherWithWalletsQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(10),
  address: z.string().optional(),
  custodian: z.enum(['TRUTHER_APP', 'BITFINEXAC1']).optional()
})

export async function getUsersTrutherWithWalletsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { page, limit, address, custodian } = getUsersTrutherWithWalletsQuerySchema.parse(req.query)

  const getUsersTrutherWithWalletsUseCase = makeGetUsersTrutherWithWalletsUseCase()
  const result = await getUsersTrutherWithWalletsUseCase.execute({ page, limit, address, custodian })

  return reply.status(200).send(result)
}