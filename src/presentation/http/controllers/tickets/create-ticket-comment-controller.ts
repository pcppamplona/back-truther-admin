import { makeCreateTicketCommentUseCase } from "@/application/factories/tickets/make-create-ticket-comment";
import { TicketComment } from "@/domain/tickets/model/tickets";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketCommentController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req as { body: TicketComment};

  const useCase = makeCreateTicketCommentUseCase();
  const ticket = await useCase.execute(body as any);

  await req.audit({
    action: "crm",
    message: "User create ticket comment",
    description: `User ${req.user.name} criou um novo comentário para o ticket ${ticket?.ticket_id}`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
    targetExternalId: body.ticket_id,
  });
  return reply.status(200).send(ticket);
}
