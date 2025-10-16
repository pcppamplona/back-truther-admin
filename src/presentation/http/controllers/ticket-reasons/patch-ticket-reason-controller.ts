import { makePatchTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-patch-ticket-reason";
import { FastifyRequest, FastifyReply } from "fastify";;

export async function patchTicketReasonController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const { body } = req as any;

  const useCase = makePatchTicketReasonUseCase();
  
  try {
    await useCase.execute(id, body);
    return reply.status(200).send({ message: "Ticket reason updated successfully" });
  } catch (error) {
    return reply.status(400).send({ message: "Failed to update ticket reason", error });
  }
}