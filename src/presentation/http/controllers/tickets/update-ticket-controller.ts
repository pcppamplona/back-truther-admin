import { makeUpdateTicketUseCase } from "@/application/factories/tickets/make-update-ticket";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { body } = req;

  const useCase = makeUpdateTicketUseCase(req.pgClient);
  const ticket = await useCase.execute(id, body as any);

  await req.audit({
    action: "crm",
    message: "User update ticket",
    description: `User ${req.user.name} atualizou o ticket ${ticket.id}`,
    method: "PATCH",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
    targetExternalId: id,
  });
  return reply.status(200).send(ticket);
}
