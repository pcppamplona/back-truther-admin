import { FastifyReply, FastifyRequest } from 'fastify'
import { makeExportPixOutUseCase } from '@/application/factories/transactions/make-export-pix-out'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function exportPixOutCsvController(req: FastifyRequest, reply: FastifyReply) {
  const {
    sortBy,
    sortOrder,
    created_after,
    created_before,
    wallet,
    wallets,
    txid,
    end2end,
    pixKey,
    receiverDocument,
    receiverName,
    status_px,
    status_bk,
    min_amount,
    max_amount,
  } = req.query as any

  const walletList = wallets
    ? String(wallets)
        .split(',')
        .map((w) => w.trim())
        .filter(Boolean)
    : []

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'export',
      message: `User ${req.user?.name ?? ''} exported PIX OUT transactions to CSV`,
      description: JSON.stringify({
        sortBy,
        sortOrder,
        created_after,
        created_before,
        wallet,
        wallets: walletList,
        txid,
        end2end,
        pixKey,
        receiverDocument,
        receiverName,
        status_px,
        status_bk,
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
    req.log?.warn({ err }, 'Failed to create audit log for PIXOUT CSV export')
  }

  const useCase = makeExportPixOutUseCase()
  const data = await useCase.execute({
    sortBy,
    sortOrder,
    created_after,
    created_before,
    wallet,
    wallets: walletList,
    txid,
    end2end,
    pixKey,
    receiverDocument,
    receiverName,
    status_px,
    status_bk,
    min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
    max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
  })

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'txid', header: 'txid' },
    { key: 'end2end', header: 'end2end' },
    { key: 'sender', header: 'sender' },
    { key: 'sender_name', header: 'sender_name' },
    { key: 'sender_document', header: 'sender_document' },
    { key: 'amount_brl', header: 'amount_brl' },
    { key: 'status_px', header: 'status_px' },
    { key: 'status_bk', header: 'status_bk' },
    { key: 'date_op', header: 'date_op' },
    { key: 'receiver_document', header: 'receiver_document' },
    { key: 'receiver_name', header: 'receiver_name' },
    { key: 'pixKey', header: 'pixKey' },
    { key: 'token_symbol', header: 'token_symbol' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header(
    'Content-Disposition',
    `attachment; filename=pix-out-${new Date().toISOString().slice(0,10)}.csv`
  )
  return reply.send(csv)
}
