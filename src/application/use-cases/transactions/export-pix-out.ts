import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { PixOutPaginationParams } from '@/domain/transactions/model/pix-pagination-params'
import { PixOutTransaction } from '@/domain/transactions/model/pix-out-transaction'

export class ExportPixOutUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: Omit<PixOutPaginationParams, 'page' | 'limit'>): Promise<PixOutTransaction[]> {
    return this.repo.findPixOutAll(params)
  }
}
