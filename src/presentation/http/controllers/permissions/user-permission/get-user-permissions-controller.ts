import { makeGetUserPermissionUseCase } from "@/application/factories/permissions/user-permission/make-get-user-permissions";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log";

export async function getUserPermissionsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { user_id } = req.params as { user_id: number }

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'listing',
      message: `User ${req.user?.name ?? ''} listed permissions for user ${user_id}`,
      description: JSON.stringify({ user_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'USER',
      target_id: String(user_id),
      severity: 'low',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for user permissions listing')
  }

  const useCase = makeGetUserPermissionUseCase()
  const permissions = await useCase.execute(user_id)

  return reply.status(200).send(permissions)
}
