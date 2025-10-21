import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetClientByUuidUseCase } from '@/application/factories/clients/make-get-client-by-uuid'

export async function getClientByUuidController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { uuid } = request.params as { uuid: string}
  const useCase = makeGetClientByUuidUseCase(request.pgClient)
  const client = await useCase.execute(uuid)
  if (!client) {
    return reply.status(404).send({ message: 'Client not found' })
  }
  return reply.status(200).send(client)
}
