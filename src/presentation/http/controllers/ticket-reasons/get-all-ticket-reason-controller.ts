import { makeGetAllTicketReasonUseCase } from "@/application/factories/ticket-reasons/make-get-all-ticket-reason";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllTicketReasonController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetAllTicketReasonUseCase();
  
  try {
    const reasons = await useCase.execute();
    return reply.status(200).send(reasons);
  } catch (error) {
    return reply.status(400).send({ message: "Failed to fetch ticket reasons", error });
  }
}
