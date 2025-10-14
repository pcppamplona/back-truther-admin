import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
  created_after: z.string().datetime().optional().or(z.string().optional()),
  created_before: z.string().datetime().optional().or(z.string().optional()),
})

export const listPixOutQuerySchema = paginationSchema.extend({
  wallet: z.string().optional(),
  wallets: z.string().optional(),
  txid: z.string().optional(),
  end2end: z.string().optional(),
  pixKey: z.string().optional(),
  receiverDocument: z.string().optional(),
  receiverName: z.string().optional(),
  status_px: z.string().optional(),
  status_bk: z.string().optional(),
  min_amount: z.string().optional(),
  max_amount: z.string().optional(),
})

export const listPixInQuerySchema = paginationSchema.extend({
  wallet: z.string().optional(),
  wallets: z.string().optional(),
  txid: z.string().optional(),
  end2end: z.string().optional(),
  destinationKey: z.string().optional(),
  payerDocument: z.string().optional(),
  payerName: z.string().optional(),
  status_bank: z.string().optional(),
  status_blockchain: z.string().optional(),
  typeIn: z.string().optional(),
  min_amount: z.string().optional(),
  max_amount: z.string().optional(),
})

export const pixOutItemSchema = z.object({
  id: z.number().nullable(),
  txid: z.string().nullable(),
  end2end: z.string().nullable(),
  sender: z.string().nullable(),
  sender_name: z.string().nullable(),
  sender_document: z.string().nullable(),
  amount_brl: z.union([z.number(), z.string()]).nullable(),
  status_px: z.string().nullable(),
  status_bk: z.string().nullable(),
  date_op: z.string().nullable(),
  receiver_document: z.string().nullable(),
  receiver_name: z.string().nullable(),
  pixKey: z.string().nullable(),
})

export const pixInItemSchema = z.object({
  id: z.number().nullable(),
  wallet_id: z.number().nullable(),
  txid: z.string().nullable(),
  receive_wallet: z.string().nullable(),
  receive_name: z.string().nullable(),
  receive_doc: z.string().nullable(),
  destinationKey: z.string().nullable(),
  end2end: z.string().nullable(),
  payer_name: z.string().nullable(),
  payer_document: z.string().nullable(),
  amount: z.union([z.number(), z.string()]).nullable(),
  status_bank: z.string().nullable(),
  status_blockchain: z.string().nullable(),
  msg_error_blockchain: z.string().nullable(),
  msg_error_bank: z.string().nullable(),
  createdAt: z.string().nullable(),
  typeIn: z.string().nullable(),
})

export const paginatedPixOutResponseSchema = z.object({
  data: z.array(pixOutItemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

export const paginatedPixInResponseSchema = z.object({
  data: z.array(pixInItemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

export type ListPixOutQuerySchema = z.infer<typeof listPixOutQuerySchema>
export type ListPixInQuerySchema = z.infer<typeof listPixInQuerySchema>
