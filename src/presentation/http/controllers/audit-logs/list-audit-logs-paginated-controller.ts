import { FastifyRequest, FastifyReply } from "fastify"
import { makeListAuditLogsPaginatedUseCase } from "@/application/factories/audit-logs/make-list-audit-logs-paginated"
import { AuditLogPaginationParams } from "@/domain/audit-logs/model/audit-log-pagination-params"

export async function listAuditLogsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { 
    page = "1", 
    limit = "100", 
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
    created_before
  } = req.query as any

  const useCase = makeListAuditLogsPaginatedUseCase()
  const params: AuditLogPaginationParams = {
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
    created_before
  }
  const result = await useCase.execute(params)

  return reply.status(200).send(result)
}