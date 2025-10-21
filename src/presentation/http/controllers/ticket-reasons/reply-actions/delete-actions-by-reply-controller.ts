import { makeDeleteReplyActionsUseCase } from "@/application/factories/ticket-reasons/reply-actions/make-delete-reply-actions";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteReplyActionController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeDeleteReplyActionsUseCase(req.pgClient);
  await useCase.execute(id);
  return reply.status(204).send();
}
