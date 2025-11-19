import { FastifyReply, FastifyRequest } from 'fastify'
import { makeExportBridgeUseCase } from '@/application/factories/transactions/make-export-bridge'
import { toCsv } from '@/shared/csv'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function exportBridgeCsvController(req: FastifyRequest, reply: FastifyReply) {
  const {
    user_id,
    wallet_id,
    value,
    status,
    sortBy,
    sortOrder,
    created_after,
    created_before,
  } = req.query as any

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'export',
      message: `User ${req.user?.name ?? ''} exported Bridge transactions to CSV`,
      description: JSON.stringify({
        user_id: user_id !== undefined ? Number(user_id) : undefined,
        wallet_id: wallet_id !== undefined ? Number(wallet_id) : undefined,
        value: value !== undefined ? Number(value) : undefined,
        status,
        sortBy,
        sortOrder,
        created_after,
        created_before,
      }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
      severity: 'high',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for Bridge CSV export')
  }

  const useCase = makeExportBridgeUseCase()
  const data = await useCase.execute({
    user_id: user_id !== undefined ? Number(user_id) : undefined,
    wallet_id: wallet_id !== undefined ? Number(wallet_id) : undefined,
    value: value !== undefined ? Number(value) : undefined,
    status,
    sortBy,
    sortOrder,
    created_after,
    created_before,
  })

  const columns = [
    { key: 'id', header: 'id' },
    { key: 'user_id', header: 'user_id' },
    { key: 'wallet_id', header: 'wallet_id' },
    { key: 'from_address', header: 'from_address' },
    { key: 'to_address', header: 'to_address' },
    { key: 'value', header: 'value' },
    { key: 'tx_hash', header: 'tx_hash' },
    { key: 'status', header: 'status' },
    { key: 'created_at', header: 'created_at' },
    { key: 'flow', header: 'flow' },
    { key: 'type', header: 'type' },
    { key: 'symbol', header: 'symbol' },
    { key: 'retry_count', header: 'retry_count' },
    { key: 'protocol_destination', header: 'protocol_destination' },
  ] as const

  const csv = toCsv(data as any[], columns as any)

  reply.header('Content-Type', 'text/csv; charset=utf-8')
  reply.header('Content-Disposition', `attachment; filename=bridges-${new Date().toISOString().slice(0,10)}.csv`)
  return reply.send(csv)
}
