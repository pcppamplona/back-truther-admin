
import { makeGetRolePermissionUseCase } from '@/application/factories/permissions/role-permission/make-get-role-permission'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function getRolePermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { role_id } = req.params as { role_id: number }

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'listing',
      message: `User ${req.user?.name ?? ''} listed permissions for role ${role_id}`,
      description: JSON.stringify({ role_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'low',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for role permissions listing')
  }

  const useCase = makeGetRolePermissionUseCase()
  const permissions = await useCase.execute(role_id)

  return reply.status(200).send(permissions)
}
