import { makeDeleteReplyUseCase } from "@/application/factories/ticket-reasons/replies/make-delete-reply";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeDeleteReplyUseCase(req.pgClient);
  await useCase.execute(id);
  return reply.status(204).send();
}
