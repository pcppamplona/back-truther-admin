import { PaginatedResult } from '@/shared/pagination'
import { PixInTransaction } from '../model/pix-in-transaction'
import { PixOutTransaction } from '../model/pix-out-transaction'
import { BilletCashoutParams, PixInPaginationParams, PixOutPaginationParams } from '../model/pix-pagination-params'
import { BilletCashoutTransaction } from '../model/billet-cashout-transaction'

export interface BanksTransactionsRepository {
  findPixOutPaginated(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>>
  findPixInPaginated(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>>

  findBilletCashoutPaginated(params: BilletCashoutParams): Promise<PaginatedResult<BilletCashoutTransaction>>;
}
