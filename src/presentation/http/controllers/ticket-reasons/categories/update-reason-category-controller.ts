import { makeUpdateReasonCategoryUseCase } from "@/application/factories/ticket-reasons/categories/make-update-reason-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function updateReasonCategoryController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { type, description } = req.body as Partial<{ type: string; description: string }>;

  const useCase = makeUpdateReasonCategoryUseCase();
  const result = await useCase.execute(id, { type, description });

  await req.audit({
    action: "crm",
    message: "User updated Reason Category",
    description: `User ${req.user.name} atualizou a categoria ${id} (${type || "sem alteração no tipo"})`,
    method: "PATCH",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  return reply.status(200).send(result);
}
