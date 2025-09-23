import { makeGetTicketCommentUseCase } from "@/application/factories/tickets/make-ticket-comment";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketCommentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { ticket_id } = req.params as { ticket_id: number };
  
  const useCase = makeGetTicketCommentUseCase();
  const ticket = await useCase.execute(ticket_id);

  return reply.status(200).send(ticket);
}
