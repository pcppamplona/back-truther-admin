import { FastifyReply, FastifyRequest } from "fastify";

export async function createReplyController(req: FastifyRequest, reply: FastifyReply) {
  const { reason_id } = req.params as { reason_id: number };
  const { reply: text, comment } = req.body as { reply: string; comment: boolean };
  const useCase = makeCreateReplyUseCase();
  const result = await useCase.execute({ reason_id, reply: text, comment });
  return reply.status(201).send(result);
}