import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListClientsUseCase } from '@/application/factories/make-list-clients'

export async function listClientsController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListClientsUseCase()
  const clients = await useCase.execute()
  return reply.status(200).send(clients)
}
