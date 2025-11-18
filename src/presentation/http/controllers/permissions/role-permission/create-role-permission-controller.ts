import { makeCreateRolePermissionUseCase } from "@/application/factories/permissions/role-permission/make-create-role-permission";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log";

export async function createRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id, permission_id } = req.body as { role_id: number; permission_id: number }
  const useCase = makeCreateRolePermissionUseCase(req.pgClient)

  await useCase.execute({ role_id, permission_id })

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'POST',
      action: 'alter',
      message: `User ${req.user?.name ?? ''} assigned permission ${permission_id} to role ${role_id}`,
      description: JSON.stringify({ role_id, permission_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'medium',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for create role permission')
  }

  return reply.status(201).send({ message: 'Permission added to role' })
}
