import { makeGetTicketReasonsByIdUseCase } from "@/application/factories/tickets/make-get-ticket-reasons-by-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketReasonsByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
   const { id} = req.params as { id: number };

  const useCase = makeGetTicketReasonsByIdUseCase();
  const ticket = await useCase.execute(id);

  return reply.status(200).send(ticket);
}
