import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListSystemsUseCase } from '@/application/factories/systems/make-list-systems'

export async function listSystemsController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListSystemsUseCase()
  const systems = await useCase.execute()
  return reply.status(200).send(systems)
}