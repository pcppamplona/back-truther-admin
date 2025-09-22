import { makeFinalizeTicket } from "@/application/factories/tickets/make-finalize-ticket";
import { makeGetMeUseCase } from "@/application/factories/user/make-get-me";
import { FastifyReply, FastifyRequest } from "fastify";

export async function finalizeTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { replyId, commentText, forceAssign } = req.body as {
    replyId: number;
    commentText?: string;
    forceAssign?: boolean;
  };

  const userId = req.user.sub;
  const getMeUseCase = makeGetMeUseCase();
  const dbUser = await getMeUseCase.execute({ userId: Number(userId) });

  const user = {
    id: dbUser.id.toString(),
    name: dbUser.name,
    group: dbUser.groupLevel,
  };

  const finalizeTicketUseCase = makeFinalizeTicket();

  const result = await finalizeTicketUseCase.execute({
    ticketId: id,
    replyId,
    commentText,
    forceAssign,
    user,
  });

  return reply.status(200).send(result);
}