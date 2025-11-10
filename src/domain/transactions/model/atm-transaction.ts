export interface AtmTransaction {
  id: number;
  txid: string;
  refundTxid: string | null;
  block: number | null;
  sender: string;
  receiver: string | null;
  amount_crypto: string;
  status_bk: string;
  receiverName: string;
  receiverDocument: string;
  amount_brl: string;
  status_px: string;
  createdAt: string;
}
