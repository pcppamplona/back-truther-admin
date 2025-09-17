import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAuditLogByIdUseCase } from '@/application/factories/audit-logs/make-get-audit-log-by-id'
import { z } from 'zod'

export async function getAuditLogByIdController(req: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(req.params)

  const useCase = makeGetAuditLogByIdUseCase()
  const auditLog = await useCase.execute(id)

  if (!auditLog) {
    return reply.status(404).send({ message: 'Log de auditoria não encontrado' })
  }

  return reply.status(200).send(auditLog)
}