import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportPixOutUseCase } from '@/application/use-cases/transactions/export-pix-out'

export function makeExportPixOutUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportPixOutUseCase(repo)
}
