import { FastifyRequest, FastifyReply } from "fastify";
import { makeListAllUserTransactionsUseCase } from "@/application/factories/transactions/make-list-all-user-transactions";
import { PaginationParams } from "@/shared/pagination";


export async function listAllUserTransactionsController(req: FastifyRequest, reply: FastifyReply) {
  const { document } = req.params as { document: string };
  const {
    page = "1",
    limit = "100",
    search,
    sortBy,
    sortOrder
  } = req.query as Partial<PaginationParams>;

  if (!document) {
    return reply.status(400).send({ error: "document is required" });
  }

  try {
    const useCase = makeListAllUserTransactionsUseCase();

    const transactions = await useCase.execute(document, {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      search,
      sortBy,
      sortOrder,
    });

    return reply.status(200).send(transactions);
  } catch (err) {
    return reply.status(500).send({ error: 'Erro interno ao buscar transações' });
  }
}
