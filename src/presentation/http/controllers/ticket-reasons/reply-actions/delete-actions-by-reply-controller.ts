import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteReplyActionController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeDeleteReplyActionUseCase();
  await useCase.execute(id);
  return reply.status(204).send();
}
