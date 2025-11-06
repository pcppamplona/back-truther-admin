import { ListAllUserTransactionsUseCase } from "@/application/use-cases/transactions/list-all-user-transactions";
import { PgBanksTransactionsRepository } from "@/infra/db/repositories/pg/pg-banks-transactions-repository";

export function makeListAllUserTransactionsUseCase() {
  const repo = new PgBanksTransactionsRepository();
  return new ListAllUserTransactionsUseCase(repo);
}
