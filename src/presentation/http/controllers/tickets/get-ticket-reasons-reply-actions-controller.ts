import { makeTicketReasonsReplyActionsUseCase } from "@/application/factories/tickets/make-get-ticket-reasons-reply-action";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketReasonsReplyActionsController(req: FastifyRequest, reply: FastifyReply) {
  const { reply_id } = req.params as { reply_id: number };
  const useCase = makeTicketReasonsReplyActionsUseCase();
  const reasons = await useCase.execute(reply_id);
  return reply.status(200).send(reasons);
}
