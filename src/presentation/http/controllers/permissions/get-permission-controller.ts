import { makeGetPermissionUseCase } from "@/application/factories/permissions/make-get-permission"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getPermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const useCase = makeGetPermissionUseCase()
  const permissions = await useCase.execute()

  return reply.status(200).send({ permissions })
}