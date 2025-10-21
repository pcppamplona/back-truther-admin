import { makeGetAllReplyActionsUseCase } from "@/application/factories/ticket-reasons/reply-actions/make-get-all-reply-actions"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAllReplyActionsController(req: FastifyRequest, reply: FastifyReply) {
    const useCase = makeGetAllReplyActionsUseCase(req.pgClient)
    const tickets = await useCase.execute()

    return reply.status(200).send(tickets)
}