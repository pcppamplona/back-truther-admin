import { FastifyReply, FastifyRequest } from 'fastify'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'
import { makeExportByDocumentUseCase } from '@/application/factories/transactions/make-export-by-document'

export async function exportByDocumentCsvController(req: FastifyRequest, reply: FastifyReply) {
  const { document } = req.params as { document: string }
  const { status, created_after, created_before, value, hash } = req.query as any

  if (!document) {
    return reply.status(400).send({ error: 'document is required' })
  }

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'export',
      message: `User ${req.user?.name ?? ''} exported User transactions by document to CSV`,
      description: JSON.stringify({ document, status, created_after, created_before, value, hash }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'high',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for By-Document CSV export')
  }

  const useCase = makeExportByDocumentUseCase()
  const data = await useCase.execute(document, {
    status,
    created_after,
    created_before,
    value: value !== undefined ? Number(value) : undefined,
    hash,
  } as any)

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'uuid', header: 'uuid' },
    { key: 'token_id', header: 'token_id' },
    { key: 'user_id', header: 'user_id' },
    { key: 'from_address', header: 'from_address' },
    { key: 'to_address', header: 'to_address' },
    { key: 'value', header: 'value' },
    { key: 'fee_value', header: 'fee_value' },
    { key: 'status', header: 'status' },
    { key: 'type', header: 'type' },
    { key: 'tx_hash', header: 'tx_hash' },
    { key: 'symbol', header: 'symbol' },
    { key: 'flow', header: 'flow' },
    { key: 'created_at', header: 'created_at' },
    { key: 'updated_at', header: 'updated_at' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header('Content-Disposition', `attachment; filename=by-document-${document}-${new Date().toISOString().slice(0,10)}.csv`)
  return reply.send(csv)
}
