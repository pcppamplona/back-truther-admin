import { FastifyReply, FastifyRequest } from "fastify";

export async function getActionsByReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { reply_id } = req.params as { reply_id: number };
  const useCase = makeGetReplyActionsUseCase();
  const actions = await useCase.execute(reply_id);
  return reply.status(200).send(actions);
}