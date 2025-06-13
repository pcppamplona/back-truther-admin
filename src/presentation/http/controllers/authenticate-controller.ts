import { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUseCase } from '@/application/factories/make-authenticate-user'

import { authenticateInputSchema } from '../schemas/authenticate.schema'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { encryptedAuthCode } = authenticateInputSchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const { user } = await authenticateUseCase.execute({
    encryptedAuthCode,
  })

  const token = request.server.generateJwt({ sub: user.id })

  return reply.status(200).send({ token })
}
