import { makeGetTicketsPaginatedUseCase } from "@/application/factories/tickets/make-get-tickets-paginated"
import { FastifyRequest, FastifyReply } from "fastify"

export async function GetTicketsPaginatedController(req: FastifyRequest, reply: FastifyReply) {
  const { 
    page = "1", 
    limit = "100", 
    search, 
    sortBy, 
    sortOrder, 
    onlyAssigned, 
    assignedGroup 
  } = req.query as any;

  const userId = req.user.sub;

  const useCase = makeGetTicketsPaginatedUseCase();
  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    sortBy,
    sortOrder,
    onlyAssigned: onlyAssigned === "true",
    assignedGroup,
    userId,
  });

  return reply.status(200).send(result);
}
