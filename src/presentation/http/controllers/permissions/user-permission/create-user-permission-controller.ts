import { makeCreateUserPermissionsUseCase } from '@/application/factories/permissions/user-permission/make-create-user-permission'
import { FastifyRequest, FastifyReply } from 'fastify'

interface CreateUserPermissionBody {
  user_id: number
  permission_id: number
}

export async function createUserPermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { user_id, permission_id } = req.body as CreateUserPermissionBody

  if (!user_id || !permission_id) {
    return reply.status(400).send({ message: 'Missing required fields' })
  }

  const useCase = makeCreateUserPermissionsUseCase(req.pgClient)
  await useCase.execute({ user_id, permission_id })

  return reply.status(201).send({ message: 'Permission assigned successfully' })
}
