import { PaginatedResult } from '@/shared/pagination'
import { PixInTransaction } from '../model/pix-in-transaction'
import { PixOutTransaction } from '../model/pix-out-transaction'
import { PixInPaginationParams, PixOutPaginationParams } from '../model/pix-pagination-params'

export interface BanksTransactionsRepository {
  findPixOutPaginated(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>>
  findPixInPaginated(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>>
}
