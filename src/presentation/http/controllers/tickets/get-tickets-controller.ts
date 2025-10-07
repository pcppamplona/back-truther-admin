import { makeGetTicketsUseCase } from "@/application/factories/tickets/make-get-tickets";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketsController(req: FastifyRequest, reply: FastifyReply) {
    const useCase = makeGetTicketsUseCase()
    const tickets = await useCase.execute()

    return reply.status(200).send(tickets)
}