import { ListPixOutPaginatedUseCase } from '@/application/use-cases/transactions/list-pix-out-paginated'
import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'

export function makeListPixOutPaginatedUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ListPixOutPaginatedUseCase(repo)
}
