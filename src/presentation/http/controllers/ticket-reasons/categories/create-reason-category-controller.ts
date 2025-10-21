import { makeCreateReasonCategoryUseCase } from "@/application/factories/ticket-reasons/categories/make-create-reason-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createReasonCategoryController(req: FastifyRequest, reply: FastifyReply) {
  const { type, description } = req.body as { type: string; description: string };

  const useCase = makeCreateReasonCategoryUseCase(req.pgClient);
  const result = await useCase.execute({ type, description });

  await req.audit({
    action: "crm",
    message: "User created new Reason Category",
    description: `User ${req.user.name} criou a categoria de reason '${type}' (${result.id})`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  return reply.status(201).send(result);
}
