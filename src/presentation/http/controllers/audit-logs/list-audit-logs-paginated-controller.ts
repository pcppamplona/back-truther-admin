import { FastifyRequest, FastifyReply } from "fastify"
import { makeListAuditLogsPaginatedUseCase } from "@/application/factories/audit-logs/make-list-audit-logs-paginated"

export async function listAuditLogsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { page = "1", limit = "100", search, sortBy, sortOrder } = req.query as any

  const useCase = makeListAuditLogsPaginatedUseCase()
  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
  })

  return reply.status(200).send(result)
}