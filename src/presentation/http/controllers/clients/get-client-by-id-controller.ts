import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetClientByIdUseCase } from "@/application/factories/clients/make-get-client-by-id"
import { GetClientByIdParamsSchema } from "../../schemas/clients.schema"

export async function getClientByIdController(
  request: FastifyRequest<{ Params: GetClientByIdParamsSchema }>,
  reply: FastifyReply
) {
  const { id } = request.params
  const useCase = makeGetClientByIdUseCase()

  const client = await useCase.execute(Number(id))

  if (!client) {
    return reply.status(404).send({ message: "Client not found" })
  }

  return reply.status(200).send(client)
}
