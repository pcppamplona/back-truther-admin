import { FastifyReply, FastifyRequest } from 'fastify'
import { makeExportBilletCashoutUseCase } from '@/application/factories/transactions/make-export-billet-cashout'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function exportBilletCashoutCsvController(req: FastifyRequest, reply: FastifyReply) {
  const {
    created_after,
    created_before,
    status,
    receiverName,
    receiverDocument,
    min_amount,
    max_amount,
    banksId,
    orderId,
  } = req.query as any

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'export',
      message: `User ${req.user?.name ?? ''} exported Billet Cashout transactions to CSV`,
      description: JSON.stringify({
        created_after,
        created_before,
        status,
        receiverName,
        receiverDocument,
        min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
        max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
        banksId: banksId !== undefined ? Number(banksId) : undefined,
        orderId: orderId !== undefined ? Number(orderId) : undefined,
      }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'high',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for Billet Cashout CSV export')
  }

  const useCase = makeExportBilletCashoutUseCase()
  const data = await useCase.execute({
    created_after,
    created_before,
    status,
    receiverName,
    receiverDocument,
    min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
    max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
    banksId: banksId !== undefined ? Number(banksId) : undefined,
    orderId: orderId !== undefined ? Number(orderId) : undefined,
  })

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'uuid', header: 'uuid' },
    { key: 'identifier', header: 'identifier' },
    { key: 'movimentCode', header: 'movimentCode' },
    { key: 'transactionCode', header: 'transactionCode' },
    { key: 'transactionIdentifier', header: 'transactionIdentifier' },
    { key: 'aditionalInfor', header: 'aditionalInfor' },
    { key: 'receiverName', header: 'receiverName' },
    { key: 'receiverDocument', header: 'receiverDocument' },
    { key: 'brcode', header: 'brcode' },
    { key: 'msgError', header: 'msgError' },
    { key: 'tryAgain', header: 'tryAgain' },
    { key: 'status', header: 'status' },
    { key: 'countTimer', header: 'countTimer' },
    { key: 'refundMovimentCode', header: 'refundMovimentCode' },
    { key: 'createdAt', header: 'createdAt' },
    { key: 'updateAt', header: 'updateAt' },
    { key: 'banksId', header: 'banksId' },
    { key: 'orderId', header: 'orderId' },
    { key: 'feeSymbol', header: 'feeSymbol' },
    { key: 'price', header: 'price' },
    { key: 'fee', header: 'fee' },
    { key: 'amount', header: 'amount' },
    { key: 'typeBoleto', header: 'typeBoleto' },
    { key: 'module', header: 'module' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header('Content-Disposition', `attachment; filename=billet-cashout-${new Date().toISOString().slice(0,10)}.csv`)
  return reply.send(csv)
}
