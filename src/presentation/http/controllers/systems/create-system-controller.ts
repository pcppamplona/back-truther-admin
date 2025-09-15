import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateSystemUseCase } from '@/application/factories/systems/make-create-system'

export async function createSystemController(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req
  const useCase = makeCreateSystemUseCase()
  const system = await useCase.execute(body as any)
  return reply.status(201).send(system)
}