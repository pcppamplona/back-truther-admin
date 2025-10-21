import { PaginatedResult } from '@/shared/pagination'
import { PixOutTransaction } from '@/domain/transactions/model/pix-out-transaction'
import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { PixOutPaginationParams } from '@/domain/transactions/model/pix-pagination-params'

export class ListPixOutPaginatedUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>> {
    return this.repo.findPixOutPaginated(params)
  }
}
