import { makeGetAllRepliesUseCase } from "@/application/factories/ticket-reasons/replies/make-get-all-replies"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAllRepliesController(req: FastifyRequest, reply: FastifyReply) {
    const useCase = makeGetAllRepliesUseCase()
    const tickets = await useCase.execute()

    return reply.status(200).send(tickets)
}