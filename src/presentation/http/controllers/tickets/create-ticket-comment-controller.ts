import { makeCreateTicketCommentUseCase } from "@/application/factories/tickets/make-create-ticket-comment";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketCommentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req;
  const useCase = makeCreateTicketCommentUseCase();
  const ticket = await useCase.execute(body as any);

  return reply.status(200).send(ticket);
}
