import { makeCreateActionsTypeUseCase } from "@/application/factories/ticket-reasons/actions-type/make-create-actions-type";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createActionsTypeController(req: FastifyRequest, reply: FastifyReply) {
  const { type } = req.body as { type: string };
  const useCase = makeCreateActionsTypeUseCase();
  const action = await useCase.execute(type);
  return reply.status(201).send(action);
}