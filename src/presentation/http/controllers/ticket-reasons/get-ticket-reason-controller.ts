import { makeGetTicketReasonByIdUseCase } from "@/application/factories/ticket-reasons/make-get-ticket-reason";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getTicketReasonController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: number };
  const useCase = makeGetTicketReasonByIdUseCase(req.pgClient);
  
  try {
    const reason = await useCase.execute(id);
    if (!reason) {
      return reply.status(404).send({ message: "Ticket reason not found" });
    }
    return reply.status(200).send(reason);
  } catch (error) {
    return reply.status(400).send({ message: "Failed to get ticket reason", error });
  }
}
