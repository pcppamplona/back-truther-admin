import { makeGetUserPermissionUseCase } from "@/application/factories/permissions/user-permission/make-get-user-permissions";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserPermissionsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { user_id } = req.params as { user_id: number }

  const useCase = makeGetUserPermissionUseCase()
  const permissions = await useCase.execute(user_id)

  return reply.status(200).send(permissions)
}
