import { makeGetAllUsersUseCase } from '@/application/factories/user/make-get-all-users'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getUsersController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getAllUsersUseCase = makeGetAllUsersUseCase()
  const users = await getAllUsersUseCase.execute()

  return reply.status(200).send(users)
}
