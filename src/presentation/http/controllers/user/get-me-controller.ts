import { makeGetMeUseCase } from '@/application/factories/user/make-get-me'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getMeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub

  const getMeUseCase = makeGetMeUseCase()
  const user = await getMeUseCase.execute({ userId: Number(userId) })

  return reply.status(200).send(user)
}
