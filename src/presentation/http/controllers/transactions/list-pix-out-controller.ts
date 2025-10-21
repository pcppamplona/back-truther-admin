import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPixOutPaginatedUseCase } from '@/application/factories/transactions/make-list-pix-out-paginated'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function listPixOutPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const {
    page = '1',
    limit = '50',
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

  const useCase = makeListPixOutPaginatedUseCase()

  const walletList = wallets
    ? String(wallets)
        .split(',')
        .map((w) => w.trim())
        .filter(Boolean)
    : []

  const filters: Record<string, any> = {}
  const assignIfDefined = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      filters[key] = value
    }
  }

  assignIfDefined('created_after', created_after)
  assignIfDefined('created_before', created_before)
  assignIfDefined('wallet', wallet)
  if (walletList.length) assignIfDefined('wallets', walletList)
  assignIfDefined('txid', txid)
  assignIfDefined('end2end', end2end)
  assignIfDefined('pixKey', pixKey)
  assignIfDefined('receiverDocument', receiverDocument)
  assignIfDefined('receiverName', receiverName)
  assignIfDefined('status_px', status_px)
  assignIfDefined('status_bk', status_bk)
  if (min_amount !== undefined) assignIfDefined('min_amount', Number(min_amount))
  if (max_amount !== undefined) assignIfDefined('max_amount', Number(max_amount))

  if (Object.keys(filters).length > 0) {
    try {
      const auditUseCase = makeCreateAuditLogUseCase()
      await auditUseCase.execute({
        method: 'GET',
        action: 'listing',
        message: `User ${req.user?.name ?? ''} applied filters to search for PIX OUT transactions`,
        description: JSON.stringify(filters),
        sender_type: 'ADMIN',
        sender_id: String(req.user?.sub ?? ''),
        target_type: 'ADMIN',
        target_id: '',
      })
    } catch (err) {
      req.log?.warn({ err }, 'Failed to create audit log for PIXOUT filters')
    }
  }

  const result = await useCase.execute({
    page: parseInt(String(page), 10) || 1,
    limit: parseInt(String(limit), 10) || 50,
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

  return reply.status(200).send(result)
}
