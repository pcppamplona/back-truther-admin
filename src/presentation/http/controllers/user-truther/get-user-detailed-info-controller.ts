import { makeGetUserDetailedInfoUseCase } from '@/application/factories/user-truther/make-get-user-detailed-info'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const getUserDetailedInfoParamsSchema = z.object({
  userId: z.coerce.number().positive()
})

export async function getUserDetailedInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getUserDetailedInfoParamsSchema.parse(req.params)

  const getUserDetailedInfoUseCase = makeGetUserDetailedInfoUseCase()
  const result = await getUserDetailedInfoUseCase.execute({ userId })

  if (!result) {
    return reply.status(404).send({ message: 'User not found' })
  }

  return reply.status(200).send(result)
}