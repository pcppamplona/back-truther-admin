import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportBilletCashoutUseCase } from '@/application/use-cases/transactions/export-billet-cashout'

export function makeExportBilletCashoutUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportBilletCashoutUseCase(repo)
}
