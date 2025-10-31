import { makeFinalizeTicket } from "@/application/factories/tickets/make-finalize-ticket";
import { FastifyReply, FastifyRequest } from "fastify";

export async function finalizeTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { reply_id, comment } = req.body as {
    reply_id: number;
    comment?: string;
  };

  const finalizeTicketUseCase = makeFinalizeTicket(req.pgClient);

  const user = {
    id: req.user.sub,
    name: req.user.name,
    role_id: req.user.role,
  };

  const result = await finalizeTicketUseCase.execute({
    ticket_id: id,
    reply_id,
    comment,
    user,
  }, req);

  return reply.status(200).send(result);
}
