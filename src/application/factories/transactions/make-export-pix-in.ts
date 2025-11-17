import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportPixInUseCase } from '@/application/use-cases/transactions/export-pix-in'

export function makeExportPixInUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportPixInUseCase(repo)
}
