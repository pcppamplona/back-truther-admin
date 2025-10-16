import { makeCreateTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-create-ticket-reason";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketReasonController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req as any;
  const useCase = makeCreateTicketReasonUseCase();

  const reason = await useCase.execute(body, body.replies);

  await req.audit({
    action: "crm",
    message: "User create new Reason",
    description: `User ${req.user.name} criou um novo reason ${reason?.id}:${reason?.reason}`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  return reply.status(201).send(reason);
}
