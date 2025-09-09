import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListAuditLogsUseCase } from '@/application/factories/audit-logs/make-list-audit-logs'

export async function listAuditLogsController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListAuditLogsUseCase()
  const auditLogs = await useCase.execute()
  return reply.status(200).send(auditLogs)
}