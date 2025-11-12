import { makeDeleteUserPermissionUseCase } from "@/application/factories/permissions/user-permission/make-delete-user-permission";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteUserPermissionController(req: FastifyRequest, reply: FastifyReply) {
  const { user_id, permission_id } = req.params as { user_id: number; permission_id: number }

  const useCase = makeDeleteUserPermissionUseCase()
  await useCase.execute({ user_id, permission_id })

  return reply.status(204).send()
}