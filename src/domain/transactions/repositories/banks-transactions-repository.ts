import { PaginatedResult, PaginationParams } from '@/shared/pagination'
import { PixInTransaction } from '../model/pix-in-transaction'
import { PixOutTransaction } from '../model/pix-out-transaction'
import { BilletCashoutParams, BridgeParams, PixInPaginationParams, PixOutPaginationParams } from '../model/pix-pagination-params'
import { BilletCashoutTransaction } from '../model/billet-cashout-transaction'
import { BridgeTransaction } from '../model/bridge-transaction'
import { UserTransaction } from '../model/user-transaction'

export interface BanksTransactionsRepository {
  findPixOutPaginated(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>>
  findPixInPaginated(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>>

  findBilletCashoutPaginated(params: BilletCashoutParams): Promise<PaginatedResult<BilletCashoutTransaction>>;

  findBridgePaginated(params: BridgeParams): Promise<PaginatedResult<BridgeTransaction>>;

  findAllUserTransactionsByDocument(document: string, params?: PaginationParams): Promise<PaginatedResult<UserTransaction>>;
}
