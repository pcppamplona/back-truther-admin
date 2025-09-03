import { makeGetUserTrutherByIdUseCase } from '@/application/factories/user-truther/make-get-user-detailed-info'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const getUserTrutherByIdParamsSchema = z.object({
  userId: z.coerce.number().positive()
})

export async function getUserTrutherByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = getUserTrutherByIdParamsSchema.parse(req.params)

  const getUserTrutherByIdUseCase = makeGetUserTrutherByIdUseCase()
  const result = await getUserTrutherByIdUseCase.execute({ userId })

  if (!result) {
    return reply.status(404).send({ message: 'User not found' })
  }

  return reply.status(200).send(result)
}