import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'
import { makeListBilletCashoutPaginatedUseCase } from '@/application/factories/transactions/make-list-billet-cashout-paginated'

export async function listBilletCashoutPaginatedController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    page = '1',
    limit = '50',
    created_after,
    created_before,
    status,
    receiverName,
    receiverDocument,
    identifier,
    brcode,
    min_amount,
    max_amount,
    banksId,
    orderId,
  } = req.query as any

  const useCase = makeListBilletCashoutPaginatedUseCase()

  const filters: Record<string, any> = {}

  const assignIfDefined = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      filters[key] = value
    }
  }

  assignIfDefined('created_after', created_after)
  assignIfDefined('created_before', created_before)
  assignIfDefined('status', status)
  assignIfDefined('receiverName', receiverName)
  assignIfDefined('receiverDocument', receiverDocument)
  assignIfDefined('identifier', identifier)
  assignIfDefined('brcode', brcode)

  if (min_amount !== undefined) assignIfDefined('min_amount', Number(min_amount))
  if (max_amount !== undefined) assignIfDefined('max_amount', Number(max_amount))
  if (banksId !== undefined) assignIfDefined('banksId', Number(banksId))
  if (orderId !== undefined) assignIfDefined('orderId', Number(orderId))

  if (Object.keys(filters).length > 0) {
    try {
      const auditUseCase = makeCreateAuditLogUseCase()
      await auditUseCase.execute({
        method: 'GET',
        action: 'listing',
        message: `User ${req.user?.name ?? ''} applied filters to search for Billet Cashout transactions`,
        description: JSON.stringify(filters),
        sender_type: 'ADMIN',
        sender_id: String(req.user?.sub ?? ''),
        target_type: 'ADMIN',
        target_id: '',
      })
    } catch (err) {
      req.log?.warn({ err }, 'Failed to create audit log for Billet Cashout filters')
    }
  }

  const result = await useCase.execute({
    page: parseInt(String(page), 10) || 1,
    limit: parseInt(String(limit), 10) || 50,
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

  return reply.status(200).send(result)
}
