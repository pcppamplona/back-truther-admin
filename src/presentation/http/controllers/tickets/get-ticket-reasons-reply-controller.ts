import { makeTicketReasonsReplyUseCase } from "@/application/factories/tickets/make-get-ticket-reasons-reply";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketReasonsReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { reason_id } = req.params as { reason_id: number };
  const useCase = makeTicketReasonsReplyUseCase();
  const reasons = await useCase.execute(reason_id);
  return reply.status(200).send(reasons);
}
