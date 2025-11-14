import { PgBanksTransactionsRepository } from '@/infra/db/repositories/pg/pg-banks-transactions-repository'
import { UserTransactionsParams } from '@/domain/transactions/model/pix-pagination-params'
import { UserTransaction } from '@/domain/transactions/model/user-transaction'

export class ExportByDocumentUseCase {
  constructor(private repo: PgBanksTransactionsRepository) {}

  async execute(document: string, params: Omit<UserTransactionsParams, 'page' | 'limit'> = {}): Promise<UserTransaction[]> {
    return this.repo.findAllUserTransactionsByDocumentAll(document, params)
  }
}
