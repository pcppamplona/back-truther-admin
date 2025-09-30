import { makeFinalizeTicket } from "@/application/factories/tickets/make-finalize-ticket";
import { FastifyReply, FastifyRequest } from "fastify";

export async function finalizeTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { reply_id, comment_text, force_assign } = req.body as {
    reply_id: number;
    comment_text?: string;
    force_assign?: boolean;
  };

  const finalizeTicketUseCase = makeFinalizeTicket();

  const result = await finalizeTicketUseCase.execute({
    ticket_id: id,
    reply_id,
    comment_text,
    force_assign,
    user: {
      id: req.user.iat,
      name: req.user.name,
      group: req.user.role
    },
  });

  return reply.status(200).send(result);
}