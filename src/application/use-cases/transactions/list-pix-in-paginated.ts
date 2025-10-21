import { PaginatedResult } from '@/shared/pagination'
import { PixInTransaction } from '@/domain/transactions/model/pix-in-transaction'
import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { PixInPaginationParams } from '@/domain/transactions/model/pix-pagination-params'

export class ListPixInPaginatedUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>> {
    return this.repo.findPixInPaginated(params)
  }
}
