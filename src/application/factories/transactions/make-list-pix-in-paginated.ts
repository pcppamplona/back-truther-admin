import { ListPixInPaginatedUseCase } from '@/application/use-cases/transactions/list-pix-in-paginated'
import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'

export function makeListPixInPaginatedUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ListPixInPaginatedUseCase(repo)
}
