import { makeDeleteReasonCategoryUseCase } from "@/application/factories/ticket-reasons/categories/make-delete-reason-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteReasonCategoryController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };

  const useCase = makeDeleteReasonCategoryUseCase(req.pgClient);
  await useCase.execute(id);

  await req.audit({
    action: "crm",
    message: "User deleted Reason Category",
    description: `User ${req.user.name} excluiu a categoria de reason ID ${id}`,
    method: "DELETE",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  return reply.status(204).send();
}
