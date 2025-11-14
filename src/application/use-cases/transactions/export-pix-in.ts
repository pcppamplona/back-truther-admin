import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { PixInPaginationParams } from '@/domain/transactions/model/pix-pagination-params'
import { PixInTransaction } from '@/domain/transactions/model/pix-in-transaction'

export class ExportPixInUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: Omit<PixInPaginationParams, 'page' | 'limit'>): Promise<PixInTransaction[]> {
    return this.repo.findPixInAll(params)
  }
}
