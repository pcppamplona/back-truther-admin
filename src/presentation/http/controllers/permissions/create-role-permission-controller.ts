import { makeCreateRolePermissionUseCase } from "@/application/factories/permissions/make-create-role-permission";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id, permission_id } = req.body as { role_id: number; permission_id: number }
  const useCase = makeCreateRolePermissionUseCase(req.pgClient)

  await useCase.execute({ role_id, permission_id })

  return reply.status(201).send({ message: 'Permission added to role' })
}
