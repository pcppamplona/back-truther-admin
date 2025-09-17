import { makeCreateTicketUseCase } from "@/application/factories/tickets/make-create-ticket";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req;
  const useCase = makeCreateTicketUseCase();
  const ticket = await useCase.execute(body as any);

  return reply.status(200).send(ticket);
}
