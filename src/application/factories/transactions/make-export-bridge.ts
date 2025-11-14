import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportBridgeUseCase } from '@/application/use-cases/transactions/export-bridge'

export function makeExportBridgeUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportBridgeUseCase(repo)
}
