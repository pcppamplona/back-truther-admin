import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function createAuditLogController(req: FastifyRequest, reply: FastifyReply) {
  const { body } = req
  const useCase = makeCreateAuditLogUseCase()
  const auditLog = await useCase.execute(body as any)
  return reply.status(201).send(auditLog)
}