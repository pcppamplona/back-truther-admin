import { makeGetReplyActionsUseCase } from "@/application/factories/ticket-reasons/reply-actions/make-get-reply-actions";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getActionsByReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { reply_id } = req.params as { reply_id: number };
  const useCase = makeGetReplyActionsUseCase(req.pgClient);
  const actions = await useCase.execute(reply_id);
  return reply.status(200).send(actions);
}