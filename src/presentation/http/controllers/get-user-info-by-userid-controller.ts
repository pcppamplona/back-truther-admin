import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserInfoByUserIdUseCase } from '@/application/factories/make-get-user-info-by-userid'

interface Params {
  user_id: string
}

export async function getUserInfoByUserIdController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const user_id = Number(request.params.user_id)
  if (isNaN(user_id)) {
    return reply.status(400).send({ message: 'Invalid user_id parameter' })
  }
  const useCase = makeGetUserInfoByUserIdUseCase()
  const userInfo = await useCase.execute(user_id)
  if (!userInfo) {
    return reply.status(404).send({ message: 'User info not found' })
  }
  return reply.status(200).send(userInfo)
}
