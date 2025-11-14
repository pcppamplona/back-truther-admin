import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportAtmUseCase } from '@/application/use-cases/transactions/export-atm'

export function makeExportAtmUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportAtmUseCase(repo)
}
