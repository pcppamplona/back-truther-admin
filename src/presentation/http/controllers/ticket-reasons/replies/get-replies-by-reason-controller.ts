import { makeGetRepliesByReasonUseCase } from "@/application/factories/ticket-reasons/replies/make-get-replies-by-reason";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getRepliesByReasonController(req: FastifyRequest, reply: FastifyReply) {
  const { reason_id } = req.params as { reason_id: number };
  const useCase = makeGetRepliesByReasonUseCase();
  const replies = await useCase.execute(reason_id);
  return reply.status(200).send(replies);
}