import { FastifyReply, FastifyRequest } from 'fastify'
import { makeExportPixInUseCase } from '@/application/factories/transactions/make-export-pix-in'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function exportPixInCsvController(req: FastifyRequest, reply: FastifyReply) {
  const {
    sortBy,
    sortOrder,
    created_after,
    created_before,
    wallet,
    wallets,
    txid,
    end2end,
    destinationKey,
    payerDocument,
    payerName,
    status_bank,
    status_blockchain,
    typeIn,
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
      message: `User ${req.user?.name ?? ''} exported PIX IN transactions to CSV`,
      description: JSON.stringify({
        sortBy,
        sortOrder,
        created_after,
        created_before,
        wallet,
        wallets: walletList,
        txid,
        end2end,
        destinationKey,
        payerDocument,
        payerName,
        status_bank,
        status_blockchain,
        typeIn,
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
    req.log?.warn({ err }, 'Failed to create audit log for PIXIN CSV export')
  }

  const useCase = makeExportPixInUseCase()
  const data = await useCase.execute({
    sortBy,
    sortOrder,
    created_after,
    created_before,
    wallet,
    wallets: walletList,
    txid,
    end2end,
    destinationKey,
    payerDocument,
    payerName,
    status_bank,
    status_blockchain,
    typeIn,
    min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
    max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
  })

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'wallet_id', header: 'wallet_id' },
    { key: 'txid', header: 'txid' },
    { key: 'receive_wallet', header: 'receive_wallet' },
    { key: 'receive_name', header: 'receive_name' },
    { key: 'receive_doc', header: 'receive_doc' },
    { key: 'destinationKey', header: 'destinationKey' },
    { key: 'end2end', header: 'end2end' },
    { key: 'payer_name', header: 'payer_name' },
    { key: 'payer_document', header: 'payer_document' },
    { key: 'amount', header: 'amount' },
    { key: 'status_bank', header: 'status_bank' },
    { key: 'status_blockchain', header: 'status_blockchain' },
    { key: 'msg_error_blockchain', header: 'msg_error_blockchain' },
    { key: 'msg_error_bank', header: 'msg_error_bank' },
    { key: 'createdAt', header: 'createdAt' },
    { key: 'typeIn', header: 'typeIn' },
    { key: 'token_symbol', header: 'token_symbol' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header(
    'Content-Disposition',
    `attachment; filename=pix-in-${new Date().toISOString().slice(0,10)}.csv`
  )
  return reply.send(csv)
}
