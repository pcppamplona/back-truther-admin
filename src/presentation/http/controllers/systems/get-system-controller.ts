import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetSystemUseCase } from '@/application/factories/systems/make-get-system'

export async function getSystemController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: number };

  
  const useCase = makeGetSystemUseCase()
  const system = await useCase.execute(id)
  
  if (!system) {
    return reply.status(404).send({ message: 'System not found' })
  }
  
  return reply.status(200).send(system)
}