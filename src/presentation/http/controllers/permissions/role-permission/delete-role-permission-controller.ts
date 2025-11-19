import { makeDeleteRolePermissionUseCase } from "@/application/factories/permissions/role-permission/make-delete-role-permission";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log";

export async function deleteRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id, permission_id } = req.params as { role_id: number; permission_id: number }

  const useCase = makeDeleteRolePermissionUseCase()
  await useCase.execute({ role_id, permission_id })

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'DELETE',
      action: 'alter',
      message: `User ${req.user?.name ?? ''} removed permission ${permission_id} from role ${role_id}`,
      description: JSON.stringify({ role_id, permission_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'medium',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for delete role permission')
  }

  return reply.status(204).send()
}