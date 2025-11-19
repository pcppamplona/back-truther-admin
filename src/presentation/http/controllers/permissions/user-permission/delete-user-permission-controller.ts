import { makeDeleteUserPermissionUseCase } from "@/application/factories/permissions/user-permission/make-delete-user-permission";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log";

export async function deleteUserPermissionController(req: FastifyRequest, reply: FastifyReply) {
  const { user_id, permission_id } = req.params as { user_id: number; permission_id: number }

  const useCase = makeDeleteUserPermissionUseCase()
  await useCase.execute({ user_id, permission_id })

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'DELETE',
      action: 'alter',
      message: `User ${req.user?.name ?? ''} removed permission ${permission_id} from user ${user_id}`,
      description: JSON.stringify({ user_id, permission_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'USER',
      target_id: String(user_id),
      severity: 'medium',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for delete user permission')
  }

  return reply.status(204).send()
}