import { PaginationParams } from '@/shared/pagination'

export interface PixCommonFilters extends PaginationParams {
  created_after?: string
  created_before?: string
}

export interface PixOutPaginationParams extends PixCommonFilters {
  wallet?: string
  wallets?: string[]
  txid?: string
  end2end?: string
  pixKey?: string
  receiverDocument?: string
  receiverName?: string
  status_px?: string
  status_bk?: string
  min_amount?: number
  max_amount?: number
}

export interface PixInPaginationParams extends PixCommonFilters {
  wallet?: string
  wallets?: string[]
  txid?: string
  end2end?: string
  destinationKey?: string
  payerDocument?: string
  payerName?: string
  status_bank?: string
  status_blockchain?: string
  typeIn?: string
  min_amount?: number
  max_amount?: number
}
