import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateUserUseCase } from '@/application/factories/make-create-user-use-case'
import { createUserInputSchema } from '../schemas/create-user.schema'

export async function CreateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { uuid, name, username, password, active, forceResetPwd, typeAuth } =
    createUserInputSchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()
  const user = await createUserUseCase.execute({
    uuid,
    name,
    username,
    password,
    active,
    forceResetPwd,
    typeAuth,
  })

  return reply.status(201).send(user)
}
