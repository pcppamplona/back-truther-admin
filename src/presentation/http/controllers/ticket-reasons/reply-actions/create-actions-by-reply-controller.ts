import { makeCreateReplyActionsUseCase } from "@/application/factories/ticket-reasons/reply-actions/make-create-reply-actions";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createReplyActionController(req: FastifyRequest, reply: FastifyReply) {
  const { reply_id } = req.params as { reply_id: number };
  const data = req.body as {
    action_type_id: number;
    data_email: string | null;
    data_new_ticket_reason_id: number | null;
    data_new_ticket_assign_role: number | null;
  };
  const useCase = makeCreateReplyActionsUseCase(req.pgClient);
  const result = await useCase.execute({ reply_id, ...data });

   await req.audit({
    action: "crm",
    message: "User create new ReplyAction",
    description: `User ${req.user.name} criou uma nova ReplyAction ${result.id}, oriunda do ${result.reply_id} para a ação:${result.action_type_id}`,
    method: "POST",
    senderType: "USER",
    senderId: String(req.user.sub),
    targetType: "ADMIN",
    targetId: "1",
  });
  return reply.status(201).send(result);
}