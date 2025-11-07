import { FastifyRequest, FastifyReply } from "fastify";
import { makeListAllUserTransactionsUseCase } from "@/application/factories/transactions/make-list-all-user-transactions";
import { UserTransactionsParams } from "@/domain/transactions/model/pix-pagination-params";

export async function listAllUserTransactionsController(req: FastifyRequest, reply: FastifyReply) {
  const { document } = req.params as { document: string };
  const {
    page = "1",
    limit = "100",
    search,
    sortBy,
    sortOrder,
    status,
    created_after,
    created_before,
    value,
    hash,
  } = req.query as Partial<UserTransactionsParams>;

  if (!document) {
    return reply.status(400).send({ error: "document is required" });
  }
  try {
    const useCase = makeListAllUserTransactionsUseCase();

    const transactions = await useCase.execute(document, {
      page: parseInt(String(page), 10) || 1,
      limit: parseInt(String(limit), 10) || 10,
      search,
      sortBy,
      sortOrder,
      status,
      created_after,
      created_before,
      value,
      hash,
    });

    return reply.status(200).send(transactions);
  } catch (err) {
    return reply.status(500).send({ error: "Erro interno ao buscar transações" });
  }
}
