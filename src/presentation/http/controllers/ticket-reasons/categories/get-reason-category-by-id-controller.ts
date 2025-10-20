import { makeGetReasonCategoryByIdUseCase } from "@/application/factories/ticket-reasons/categories/make-get-reason-category-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getReasonCategoryByIdController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };

  const useCase = makeGetReasonCategoryByIdUseCase();
  const result = await useCase.execute(id);

  if (!result) return reply.status(404).send({ message: "Categoria não encontrada" });
  return reply.status(200).send(result);
}
