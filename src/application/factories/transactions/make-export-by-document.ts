import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { ExportByDocumentUseCase } from '@/application/use-cases/transactions/export-by-document'

export function makeExportByDocumentUseCase() {
  const repo = new PgBanksTransactionsRepository()
  return new ExportByDocumentUseCase(repo)
}
