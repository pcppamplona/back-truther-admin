import { makeGetRolePermissionsUseCase } from '@/application/factories/permissions/make-get-role-permission'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getRolePermissionsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id } = req.params as { role_id: number }
  const useCase = makeGetRolePermissionsUseCase(req.pgClient)

  const permissions = await useCase.execute(role_id)
  return reply.status(200).send(permissions)
}
