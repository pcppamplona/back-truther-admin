import { FastifyRequest, FastifyReply } from "fastify"
import { makeListClientsPaginatedUseCase } from "@/application/factories/clients/make-list-clients-paginated"

export async function listClientsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { page = "1", limit = "100", search, sortBy, sortOrder } = req.query as any

  const useCase = makeListClientsPaginatedUseCase()
  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
  })

  return reply.status(200).send(result)
}
