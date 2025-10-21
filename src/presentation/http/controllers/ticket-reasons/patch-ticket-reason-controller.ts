import { makePatchTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-patch-ticket-reason";
import { FastifyRequest, FastifyReply } from "fastify";;

export async function patchTicketReasonController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { body } = req as any;

  const useCase = makePatchTicketReasonUseCase(req.pgClient);
  
  await req.audit({
    action: "crm",
    message: "User update ticket reason",
    description: `User ${req.user.name} atualizou o reason`,
    method: "PATCH",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  try {
    await useCase.execute(id, body);
    return reply.status(200).send({ message: "Ticket reason updated successfully" });
  } catch (error) {
    return reply.status(400).send({ message: "Failed to update ticket reason", error });
  }
}