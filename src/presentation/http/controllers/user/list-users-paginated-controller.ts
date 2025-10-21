import { FastifyRequest, FastifyReply } from "fastify"
import { makeListUsersPaginatedUseCase } from "@/application/factories/user/make-list-users-paginated"

export async function listUsersPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { page = "1", limit = "100", search, sortBy, sortOrder } = req.query as any

  const useCase = makeListUsersPaginatedUseCase(req.pgClient)
  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
  })

  return reply.status(200).send(result)
}
