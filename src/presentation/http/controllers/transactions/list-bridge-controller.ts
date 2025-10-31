import { makeListBridgePaginatedUseCase } from "@/application/factories/transactions/make-list-bridge-paginated";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAuditLogUseCase } from '@/application/factories/audit-logs/make-create-audit-log'

export async function listBridgePaginatedController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const {
    page = '1',
    limit = '100',
    user_id,
    wallet_id,
    value,
    status,
    sortBy,
    sortOrder,
    created_after,
    created_before,
  } = req.query as any

  const filters: Record<string, any> = {}

  const assignIfDefined = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      filters[key] = value
    }
  }

  assignIfDefined('user_id', user_id)
  assignIfDefined('wallet_id', wallet_id)
  assignIfDefined('value', value)
  assignIfDefined('status', status)
  assignIfDefined('created_after', created_after)
  assignIfDefined('created_before', created_before)
  assignIfDefined('sortBy', sortBy)
  assignIfDefined('sortOrder', sortOrder)

  if (filters.user_id) filters.user_id = Number(filters.user_id)
  if (filters.wallet_id) filters.wallet_id = Number(filters.wallet_id)
  if (filters.value) filters.value = Number(filters.value)

  if (Object.keys(filters).length > 0) {
    try {
      const auditUseCase = makeCreateAuditLogUseCase()
      await auditUseCase.execute({
        method: 'GET',
        action: 'listing',
        message: `User ${req.user?.name ?? ''} applied filters to search for Bridge transactions`,
        description: JSON.stringify(filters),
        sender_type: 'ADMIN',
        sender_id: String(req.user?.sub ?? ''),
        target_type: 'ADMIN',
        target_id: '',
      })
    } catch (err) {
      req.log?.warn({ err }, 'Failed to create audit log for Bridge filters')
    }
  }

  const useCase = makeListBridgePaginatedUseCase()

  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy,
    sortOrder,
    user_id: filters.user_id,
    wallet_id: filters.wallet_id,
    value: filters.value,
    status,
    created_after,
    created_before,
  })

  return reply.status(200).send(result)
}
