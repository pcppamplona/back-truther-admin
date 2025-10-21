import { makeGetActionsTypeUseCase } from "@/application/factories/ticket-reasons/actions-type/make-get-actions-type";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getActionsTypeController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetActionsTypeUseCase(req.pgClient)
  const actions = await useCase.execute();
  return reply.status(200).send(actions);
}
