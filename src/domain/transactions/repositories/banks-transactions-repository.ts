import { PaginatedResult, PaginationParams } from '@/shared/pagination'
import { PixInTransaction } from '../model/pix-in-transaction'
import { PixOutTransaction } from '../model/pix-out-transaction'
import { AtmParams, BilletCashoutParams, BridgeParams, PixInPaginationParams, PixOutPaginationParams, UserTransactionsParams } from '../model/pix-pagination-params'
import { BilletCashoutTransaction } from '../model/billet-cashout-transaction'
import { BridgeTransaction } from '../model/bridge-transaction'
import { UserTransaction } from '../model/user-transaction'
import { AtmTransaction } from '../model/atm-transaction'

export interface BanksTransactionsRepository {
  findPixOutPaginated(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>>;
  findPixInPaginated(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>>;
  findPixOutAll(params: Omit<PixOutPaginationParams, 'page' | 'limit'>): Promise<PixOutTransaction[]>;
  findPixInAll(params: Omit<PixInPaginationParams, 'page' | 'limit'>): Promise<PixInTransaction[]>;
  findBilletCashoutPaginated(params: BilletCashoutParams): Promise<PaginatedResult<BilletCashoutTransaction>>;
  findBilletCashoutAll(params: Omit<BilletCashoutParams, 'page' | 'limit'>): Promise<BilletCashoutTransaction[]>;
  findBridgePaginated(params: BridgeParams): Promise<PaginatedResult<BridgeTransaction>>;
  findBridgeAll(params: Omit<BridgeParams, 'page' | 'limit'>): Promise<BridgeTransaction[]>;
  findAllUserTransactionsByDocument(document: string, params?: PaginationParams): Promise<PaginatedResult<UserTransaction>>;
  findAllUserTransactionsByDocumentAll(document: string, params?: Omit<UserTransactionsParams, 'page' | 'limit'>): Promise<UserTransaction[]>;
  findAtmPaginated(params: AtmParams): Promise<PaginatedResult<AtmTransaction>>;
  findAtmAll(params: Omit<AtmParams, 'page' | 'limit'>): Promise<AtmTransaction[]>;
}
