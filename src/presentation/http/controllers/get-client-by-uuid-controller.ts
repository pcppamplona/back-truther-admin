import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetClientByUuidUseCase } from '@/application/factories/make-get-client-by-uuid'

interface Params {
  uuid: string
}

export async function getClientByUuidController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { uuid } = request.params
  const useCase = makeGetClientByUuidUseCase()
  const client = await useCase.execute(uuid)
  if (!client) {
    return reply.status(404).send({ message: 'Client not found' })
  }
  return reply.status(200).send(client)
}
