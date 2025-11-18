import { makeCreateUserPermissionsUseCase } from '@/application/factories/permissions/user-permission/make-create-user-permission'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

interface CreateUserPermissionBody {
  user_id: number
  permission_id: number
}

export async function createUserPermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { user_id, permission_id } = req.body as CreateUserPermissionBody

  if (!user_id || !permission_id) {
    return reply.status(400).send({ message: 'Missing required fields' })
  }

  const useCase = makeCreateUserPermissionsUseCase(req.pgClient)
  await useCase.execute({ user_id, permission_id })

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'POST',
      action: 'alter',
      message: `User ${req.user?.name ?? ''} assigned permission ${permission_id} to user ${user_id}`,
      description: JSON.stringify({ user_id, permission_id }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'USER',
      target_id: String(user_id),
      severity: 'medium',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for create user permission')
  }

  return reply.status(201).send({ message: 'Permission assigned successfully' })
}
