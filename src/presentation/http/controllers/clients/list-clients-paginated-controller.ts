import { FastifyRequest, FastifyReply } from "fastify"
import { makeListClientsPaginatedUseCase } from "@/application/factories/clients/make-list-clients-paginated"

export async function listClientsPaginatedController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const page = parseInt((req.query as any).page || "1", 10)
  const limit = parseInt((req.query as any).limit || "100", 10)

  const useCase = makeListClientsPaginatedUseCase()
  const result = await useCase.execute({ page, limit })

  return reply.status(200).send(result)
}
