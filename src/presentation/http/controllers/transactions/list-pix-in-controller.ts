import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPixInPaginatedUseCase } from '@/application/factories/transactions/make-list-pix-in-paginated'

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
