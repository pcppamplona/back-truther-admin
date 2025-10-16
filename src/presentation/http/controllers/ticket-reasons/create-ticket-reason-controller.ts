import { makeCreateTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-create-ticket-reason";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createTicketReasonController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = req as any;
  const useCase = makeCreateTicketReasonUseCase();

  const reason = await useCase.execute(body, body.replies);

  return reply.status(201).send(reason);
}
