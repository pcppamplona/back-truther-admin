import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListUserInfoUseCase } from '@/application/factories/clients/make-list-user-info'

export async function listUserInfoController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListUserInfoUseCase(req.pgClient)
  const usersInfo = await useCase.execute()
  return reply.status(200).send(usersInfo)
}
