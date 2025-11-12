
import { makeGetRolePermissionUseCase } from '@/application/factories/permissions/role-permission/make-get-role-permission'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id } = req.params as { role_id: number }

  const useCase = makeGetRolePermissionUseCase()
  const permissions = await useCase.execute(role_id)

  return reply.status(200).send(permissions)
}
