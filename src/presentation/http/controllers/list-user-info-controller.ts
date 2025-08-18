import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListUserInfoUseCase } from '@/application/factories/make-list-user-info'

export async function listUserInfoController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListUserInfoUseCase()
  const usersInfo = await useCase.execute()
  return reply.status(200).send(usersInfo)
}
