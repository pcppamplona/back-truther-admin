import { FastifyReply, FastifyRequest } from "fastify";

export async function createReplyActionController(req: FastifyRequest, reply: FastifyReply) {
  const { reply_id } = req.params as { reply_id: number };
  const data = req.body as {
    action_type_id: number;
    data_email: string | null;
    data_new_ticket_reason_id: number | null;
    data_new_ticket_assign_to_group: string | null;
  };
  const useCase = makeCreateReplyActionUseCase();
  const result = await useCase.execute({ reply_id, ...data });
  return reply.status(201).send(result);
}