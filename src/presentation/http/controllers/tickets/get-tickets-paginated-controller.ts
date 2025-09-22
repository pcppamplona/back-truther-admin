import { makeGetTicketsPaginatedUseCase } from "@/application/factories/tickets/make-get-tickets-paginated"
import { FastifyRequest, FastifyReply } from "fastify"

export async function GetTicketsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { page = "1", limit = "100", search, sortBy, sortOrder } = req.query as any

  const useCase = makeGetTicketsPaginatedUseCase()
  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
  })

  return reply.status(200).send(result)
}
