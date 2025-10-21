import { makeCreateTicketUseCase } from "@/application/factories/tickets/make-create-ticket";
import { Ticket } from "@/domain/tickets/model/tickets";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req as { body: Ticket };
  const useCase = makeCreateTicketUseCase(req.pgClient);
  const ticket = await useCase.execute(body as any);
  
  await req.audit({
    action: "crm",
    message: "User create ticket",
    description: `User ${req.user.name} criou um novo ticket ${ticket?.id}`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
    targetExternalId: ticket?.id
  });
  return reply.status(200).send(ticket);
}
