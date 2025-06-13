import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateUserUseCase } from '@/application/factories/make-create-user-use-case'

import { createUserInputSchema } from '../schemas/create-user.schema'

export async function CreateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, password } = createUserInputSchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.execute({
    name,
    password,
  })

  return reply.status(201).send({ id: user.id })
}
