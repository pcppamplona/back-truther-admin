import { makeGetPaginatedUsersWithWalletsUseCase } from '@/application/factories/user-truther/make-get-paginated-users-with-wallets'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const getPaginatedUsersWithWalletsQuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().max(100).default(10)
})

export async function getPaginatedUsersWithWalletsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { page, limit } = getPaginatedUsersWithWalletsQuerySchema.parse(req.query)

  const getPaginatedUsersWithWalletsUseCase = makeGetPaginatedUsersWithWalletsUseCase()
  const result = await getPaginatedUsersWithWalletsUseCase.execute({ page, limit })

  return reply.status(200).send(result)
}