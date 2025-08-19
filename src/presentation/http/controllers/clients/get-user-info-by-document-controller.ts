import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserInfoByDocumentUseCase } from '@/application/factories/clients/make-get-user-info-by-document'

interface Params {
  document: string
}

export async function getUserInfoByDocumentController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { document } = request.params
  const useCase = makeGetUserInfoByDocumentUseCase()
  const userInfo = await useCase.execute(document)
  if (!userInfo) {
    return reply.status(404).send({ message: 'User info not found' })
  }
  return reply.status(200).send(userInfo)
}
