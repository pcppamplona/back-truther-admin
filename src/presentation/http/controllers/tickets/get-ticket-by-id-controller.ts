import { makeGetTicketByIdUseCase } from "@/application/factories/tickets/make-get-ticket-by-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
   const { id } = req.params as { id: number };

  const useCase = makeGetTicketByIdUseCase();
  const ticket = await useCase.execute(id);

  return reply.status(200).send(ticket);
}
