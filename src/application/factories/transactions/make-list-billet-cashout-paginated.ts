import { ListBilletCashoutPaginatedUseCase } from "@/application/use-cases/transactions/list-billet-cashout-paginated"
import { PgBanksTransactionsRepository } from "@/infra/db/repositories/pg/pg-banks-transactions-repository"

export function makeListBilletCashoutPaginatedUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ListBilletCashoutPaginatedUseCase(repo)
}
