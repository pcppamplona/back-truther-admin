import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetPaginatedAuditLogsByUserIdUseCase } from "@/application/factories/audit-logs/make-get-paginated-audit-logs-by-user-id"
import { AuditLogPaginationParams } from "@/domain/audit-logs/model/audit-log-pagination-params"

export async function getPaginatedAuditLogsByUserIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    user_id: z.coerce.number().int().positive(),
  })
  const { user_id } = paramsSchema.parse(req.params)

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
  } = req.query as any

  const useCase = makeGetPaginatedAuditLogsByUserIdUseCase()

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
    created_before,
    description,
  }

  const result = await useCase.execute(user_id, params)

  return reply.status(200).send(result)
}
