import { makeGetTicketCommentUseCase } from "@/application/factories/tickets/make-ticket-comment";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketCommentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  
  const useCase = makeGetTicketCommentUseCase();
  const ticket = await useCase.execute(id);

  return reply.status(200).send(ticket);
}
