import { makeGetTicketReasonsByCategoryUseCase } from "@/application/factories/tickets/make-get-ticket-reasons-by-category";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getTicketReasonsByCategoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
   const { category_id} = req.params as { category_id: number };

  const useCase = makeGetTicketReasonsByCategoryUseCase(req.pgClient);
  const ticket = await useCase.execute(category_id);

  return reply.status(200).send(ticket);
}
