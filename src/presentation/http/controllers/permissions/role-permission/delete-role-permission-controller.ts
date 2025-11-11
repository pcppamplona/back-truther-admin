import { makeDeleteRolePermissionUseCase } from "@/application/factories/permissions/role-permission/make-delete-role-permission";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id, permission_id } = req.params as { role_id: number; permission_id: number }

  const useCase = makeDeleteRolePermissionUseCase()
  await useCase.execute({ role_id, permission_id })

  return reply.status(204).send()
}