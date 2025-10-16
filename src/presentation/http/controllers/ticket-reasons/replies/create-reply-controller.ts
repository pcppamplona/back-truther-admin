import { makeCreateReplyUseCase } from "@/application/factories/ticket-reasons/replies/make-create-reply";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { reason_id } = req.params as { reason_id: number };
  const { reply: text, comment } = req.body as { reply: string; comment: boolean };
  const useCase = makeCreateReplyUseCase();
  const result = await useCase.execute({ reason_id, reply: text, comment });

  await req.audit({
    action: "crm",
    message: "User create new Reply",
    description: `User ${req.user.name} criou um novo reply ${result?.id}:${reply}, para o reason ${result.reason_id}`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });

  return reply.status(201).send(result);
}