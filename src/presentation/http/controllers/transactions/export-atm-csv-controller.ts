import { FastifyReply, FastifyRequest } from 'fastify'
import { makeExportAtmUseCase } from '@/application/factories/transactions/make-export-atm'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function exportAtmCsvController(req: FastifyRequest, reply: FastifyReply) {
  const {
    sortBy,
    sortOrder,
    created_after,
    created_before,
    txid,
    sender,
    receiverDocument,
    receiverName,
    status_bk,
    status_px,
    min_amount,
    max_amount,
  } = req.query as any

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'export',
      message: `User ${req.user?.name ?? ''} exported ATM transactions to CSV`,
      description: JSON.stringify({
        sortBy,
        sortOrder,
        created_after,
        created_before,
        txid,
        sender,
        receiverDocument,
        receiverName,
        status_bk,
        status_px,
        min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
        max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
      }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'high',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for ATM CSV export')
  }

  const useCase = makeExportAtmUseCase()
  const data = await useCase.execute({
    sortBy,
    sortOrder,
    created_after,
    created_before,
    txid,
    sender,
    receiverDocument,
    receiverName,
    status_bk,
    status_px,
    min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
    max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
  } as any)

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'txid', header: 'txid' },
    { key: 'refundTxid', header: 'refundTxid' },
    { key: 'block', header: 'block' },
    { key: 'sender', header: 'sender' },
    { key: 'receiver', header: 'receiver' },
    { key: 'amount_crypto', header: 'amount_crypto' },
    { key: 'status_bk', header: 'status_bk' },
    { key: 'receiverName', header: 'receiverName' },
    { key: 'receiverDocument', header: 'receiverDocument' },
    { key: 'amount_brl', header: 'amount_brl' },
    { key: 'status_px', header: 'status_px' },
    { key: 'createdAt', header: 'createdAt' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header('Content-Disposition', `attachment; filename=atm-${new Date().toISOString().slice(0,10)}.csv`)
  return reply.send(csv)
}
