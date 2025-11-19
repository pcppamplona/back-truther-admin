import { makeGetPermissionUseCase } from "@/application/factories/permissions/make-get-permission"
import { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log"

export async function getPermissionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'listing',
      message: `User ${req.user?.name ?? ''} listed permissions`,
      description: '',
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'low',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for permission listing')
  }

  const useCase = makeGetPermissionUseCase()
  const permissions = await useCase.execute()

  return reply.status(200).send({ permissions })
}