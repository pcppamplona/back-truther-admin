import { makePermissionService } from "@/application/factories/permissions/make-permission-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserPermissionsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };

  const permissionService = makePermissionService(req.pgClient);
  const permissions = await permissionService.getAllPermissions(id);

  return reply.status(200).send({ id, permissions });
}
