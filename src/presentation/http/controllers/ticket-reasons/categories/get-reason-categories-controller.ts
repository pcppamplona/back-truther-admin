import { makeGetReasonCategoriesUseCase } from "@/application/factories/ticket-reasons/categories/make-get-reason-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getReasonCategoriesController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetReasonCategoriesUseCase(req.pgClient);
  const result = await useCase.execute();
  return reply.status(200).send(result);
}
