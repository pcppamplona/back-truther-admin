import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPixInPaginatedUseCase } from '@/application/factories/transactions/make-list-pix-in-paginated'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function listPixInPaginatedController(req: FastifyRequest, reply: FastifyReply) {
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
    destinationKey,
    payerDocument,
    payerName,
    status_bank,
    status_blockchain,
    typeIn,
    min_amount,
    max_amount,
  } = req.query as any

  const useCase = makeListPixInPaginatedUseCase()

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
  assignIfDefined('destinationKey', destinationKey)
  assignIfDefined('payerDocument', payerDocument)
  assignIfDefined('payerName', payerName)
  assignIfDefined('status_bank', status_bank)
  assignIfDefined('status_blockchain', status_blockchain)
  assignIfDefined('typeIn', typeIn)
  if (min_amount !== undefined) assignIfDefined('min_amount', Number(min_amount))
  if (max_amount !== undefined) assignIfDefined('max_amount', Number(max_amount))

  try {
    const auditUseCase = makeCreateAuditLogUseCase()
    await auditUseCase.execute({
      method: 'GET',
      action: 'listing',
      message: `User ${req.user?.name ?? ''} applied filters to search for PIX IN transactions`,
      description: JSON.stringify({
        page: Number(page) || 1,
        limit: Number(limit) || 50,
        sortBy,
        sortOrder,
        ...filters,
      }),
      sender_type: 'ADMIN',
      sender_id: String(req.user?.sub ?? ''),
      target_type: 'ADMIN',
      target_id: '',
    })
  } catch (err) {
    req.log?.warn({ err }, 'Failed to create audit log for PIXIN filters')
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
    destinationKey,
    payerDocument,
    payerName,
    status_bank,
    status_blockchain,
    typeIn,
    min_amount: min_amount !== undefined ? Number(min_amount) : undefined,
    max_amount: max_amount !== undefined ? Number(max_amount) : undefined,
  })

  return reply.status(200).send(result)
}
