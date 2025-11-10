import { PaginationParams } from "@/shared/pagination";

export interface PixCommonFilters extends PaginationParams {
  created_after?: string;
  created_before?: string;
}

export interface PixOutPaginationParams extends PixCommonFilters {
  wallet?: string;
  wallets?: string[];
  txid?: string;
  end2end?: string;
  pixKey?: string;
  receiverDocument?: string;
  receiverName?: string;
  status_px?: string;
  status_bk?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface PixInPaginationParams extends PixCommonFilters {
  wallet?: string;
  wallets?: string[];
  txid?: string;
  end2end?: string;
  destinationKey?: string;
  payerDocument?: string;
  payerName?: string;
  status_bank?: string;
  status_blockchain?: string;
  typeIn?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface BilletCashoutParams extends PixCommonFilters {
  status?: string;
  receiverName?: string;
  receiverDocument?: string;
  min_amount?: number;
  max_amount?: number;
  banksId?: number;
  orderId?: number;
}

export interface BridgeParams extends PixCommonFilters {
  user_id?: number;
  wallet_id?: number;
  value?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}


export interface AtmParams extends PaginationParams {
  created_after?: string;
  created_before?: string;
  txid?: string;
  sender?: string;
  sender_name?: string;
  sender_document?: string;
  status_bk?: string;
  status_px?: string;
  date_op?: string;
  receiverDocument?: string;
  receiverName?: string;
  pixKey?: string;
  min_amount?: number;
  max_amount?: number;
}


export interface UserTransactionsParams extends PaginationParams {
  status?: string;
  created_after?: string;
  created_before?: string;
  value?: number;
  hash?: string;
}
