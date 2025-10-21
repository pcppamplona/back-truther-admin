export interface PixOutTransaction {
  id: number | null
  txid: string | null
  end2end: string | null
  sender: string | null
  sender_name: string | null
  sender_document: string | null
  amount_brl: number | null
  status_px: string | null
  status_bk: string | null
  date_op: string | null
  receiverDocument: string | null
  receiverName: string | null
  pixKey: string | null
  token_symbol: string | null
}
