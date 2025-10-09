import { makeDeleteTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-delete-ticket-reason";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteTicketReasonController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeDeleteTicketReasonUseCase();
  
  try {
    await useCase.execute(id);
    return reply.status(200).send({ message: "Ticket reason deleted successfully" });
  } catch (error) {
    return reply.status(400).send({ message: "Failed to delete ticket reason", error });
  }
}
