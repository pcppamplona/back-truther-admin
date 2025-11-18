import { FastifyRequest, FastifyReply } from "fastify"
import { makeListAuditLogsPaginatedUseCase } from "@/application/factories/audit-logs/make-list-audit-logs-paginated"
import { AuditLogPaginationParams } from "@/domain/audit-logs/model/audit-log-pagination-params"
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log"

export async function listAuditLogsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { 
    page = "1", 
    limit = "10",
    search, 
    sortBy, 
    sortOrder,
    action,
    method,
    sender_id,
    sender_type,
    target_id,
    target_type,
    target_external_id,
    created_after,
    created_before,
    description,
    severity,
  } = req.query as any

  const { sub: userId, role: roleId } = req.user

  const useCase = makeListAuditLogsPaginatedUseCase()

  const params: AuditLogPaginationParams & {
    userId: number
    roleId: number
  } = {
    userId,
    roleId,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
    action,
    method,
    sender_id,
    sender_type,
    target_id,
    target_type,
    target_external_id,
    created_after,
    created_before,
    description,
    severity,
  }

  try {
    const filters: Record<string, any> = {}
    const assignIfDefined = (key: string, value: any) => {
      if (value !== undefined && value !== null && value !== "") {
        filters[key] = value
      }
    }
    assignIfDefined("search", search)
    assignIfDefined("sortBy", sortBy)
    assignIfDefined("sortOrder", sortOrder)
    assignIfDefined("action", action)
    assignIfDefined("method", method)
    assignIfDefined("sender_id", sender_id)
    assignIfDefined("sender_type", sender_type)
    assignIfDefined("target_id", target_id)
    assignIfDefined("target_type", target_type)
    assignIfDefined("target_external_id", target_external_id)
    assignIfDefined("created_after", created_after)
    assignIfDefined("created_before", created_before)
    assignIfDefined("description", description)
    assignIfDefined("severity", severity)

    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'listing',
      message: `User ${req.user?.name ?? ''} searched audit logs with filters`,
      description: (Object.keys(filters).length > 0) ? JSON.stringify(filters) : '',
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'low',
    })

  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for audit-logs listing filters')
  }

  const result = await useCase.execute(params)

  return reply.status(200).send(result)
}