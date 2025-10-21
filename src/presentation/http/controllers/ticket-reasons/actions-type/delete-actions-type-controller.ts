import { makeDeleteActionsTypeUseCase } from "@/application/factories/ticket-reasons/actions-type/make-delete-actions-type";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteActionsTypeController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeDeleteActionsTypeUseCase(req.pgClient);
  await useCase.execute(id);
  return reply.status(204).send();
}