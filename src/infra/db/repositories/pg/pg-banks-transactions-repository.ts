import { PoolClient } from 'pg'
import { PostgresDatabase } from '../../pg/connection'
import { PaginatedResult } from '@/shared/pagination'
import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { PixOutTransaction } from '@/domain/transactions/model/pix-out-transaction'
import { PixInTransaction } from '@/domain/transactions/model/pix-in-transaction'
import { PixOutPaginationParams, PixInPaginationParams } from '@/domain/transactions/model/pix-pagination-params'


export class PgBanksTransactionsRepository implements BanksTransactionsRepository {
  private async getClient(): Promise<PoolClient> {
    return PostgresDatabase.getClient('banks')
  }

  async findPixOutPaginated(params: PixOutPaginationParams): Promise<PaginatedResult<PixOutTransaction>> {
    const {
      page,
      limit,
      sortBy = 'px."createdAt"',
      sortOrder = 'DESC',
      created_after,
      created_before,
      wallet,
      wallets,
      txid,
      end2end,
      pixKey,
      receiverDocument,
      receiverName,
      status_px,
      status_bk,
      min_amount,
      max_amount,
    } = params

    const offset = (page - 1) * limit

    const allowedSortBy = new Set<string>([
      'ob.id',
      'ob.txid',
      'px.end2end',
      'ob."sender"',
      'aw."name"',
      'aw."document"',
      'px."amount"',
      'px."status"',
      'ob.status',
      'px."createdAt"',
    ])

    const safeSortBy = allowedSortBy.has(sortBy) ? sortBy : 'px."createdAt"'
    const safeSortOrder = sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'

    const where: string[] = []
    const values: unknown[] = []

    const pushWhere = (clause: string, value?: unknown) => {
      if (value === undefined || value === null || value === '') return
      values.push(value)
      where.push(`${clause} $${values.length}`)
    }

    const walletList = (wallets && wallets.length > 0 ? wallets : []).concat(wallet ? [wallet] : [])
    if (walletList.length > 0) {
      const startIndex = values.length + 1
      const placeholders = walletList.map((_, i) => `$${startIndex + i}`).join(', ')
      where.push(`ob."sender" IN (${placeholders})`)
      values.push(...walletList)
    }

    pushWhere('ob.txid =', txid)
    pushWhere('px.end2end =', end2end)
    pushWhere('px."pixKey" =', pixKey)
    pushWhere('px."receiverDocument" =', receiverDocument)

    if (receiverName) {
      values.push(`%${receiverName}%`)
      where.push(`px."receiverName" ILIKE $${values.length}`)
    }

    pushWhere('px."status" =', status_px)
    pushWhere('ob.status =', status_bk)

    if (min_amount !== undefined) {
      values.push(min_amount)
      where.push(`px."amount" >= $${values.length}`)
    }
    if (max_amount !== undefined) {
      values.push(max_amount)
      where.push(`px."amount" <= $${values.length}`)
    }

    if (created_after) {
      values.push(created_after)
      where.push(`px."createdAt" >= $${values.length}`)
    }
    if (created_before) {
      values.push(created_before)
      where.push(`px."createdAt" <= $${values.length}`)
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''

    const select = `
      SELECT 
        ob.id,
        ob.txid,
        px.end2end,
        ob."sender" AS sender,
        aw."name" AS sender_name,
        aw."document" AS sender_document,
        px."amount" AS amount_brl,
        px."status" AS status_px,
        ob.status AS status_bk,
        px."createdAt"::text AS date_op,
        px."receiverDocument" as receiver_document,
        px."receiverName" as receiver_name,
        px."pixKey"
      FROM "orderBuy" AS ob
      LEFT JOIN "pixCashout" AS px ON px."orderId" = ob."id"
      LEFT JOIN "aclWallets" AS aw ON ob."sender" = aw.wallet
    `

    const orderLimit = `
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `

    const query = `${select} ${whereClause} ${orderLimit}`

    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM "orderBuy" AS ob
      LEFT JOIN "pixCashout" AS px ON px."orderId" = ob."id"
      LEFT JOIN "aclWallets" AS aw ON ob."sender" = aw.wallet
      ${whereClause}
    `

    const client = await this.getClient()
    try {
      const result = await client.query(query, [...values, limit, offset])
      const count = await client.query(countQuery, values)
      return {
        data: result.rows as PixOutTransaction[],
        total: Number(count.rows[0]?.total ?? 0),
        page,
        limit,
      }
    } finally {
      client.release()
    }
  }

  async findPixInPaginated(params: PixInPaginationParams): Promise<PaginatedResult<PixInTransaction>> {
    const {
      page,
      limit,
      sortBy = 'px."createdAt"',
      sortOrder = 'DESC',
      created_after,
      created_before,
      wallet,
      wallets,
      txid,
      end2end,
      destinationKey,
      payerDocument,
      payerName,
      status_bank,
      status_blockchain,
      typeIn,
      min_amount,
      max_amount,
    } = params

    const offset = (page - 1) * limit

    const allowedSortBy = new Set<string>([
      'ob.id',
      'aw.id',
      'ob.txid',
      'ob.wallet',
      'aw."name"',
      'aw."document"',
      'px."destinationKey"',
      'px.end2end',
      'px."PayerName"',
      'px."payerDocument"',
      'px."amount"',
      'px."status"',
      'ob.status',
      'px."createdAt"',
      'ob."typeIn"',
    ])

    const safeSortBy = allowedSortBy.has(sortBy) ? sortBy : 'px."createdAt"'
    const safeSortOrder = sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'

    const where: string[] = []
    const values: unknown[] = []

    const pushWhere = (clause: string, value?: unknown) => {
      if (value === undefined || value === null || value === '') return
      values.push(value)
      where.push(`${clause} $${values.length}`)
    }

    const walletList = (wallets && wallets.length > 0 ? wallets : []).concat(wallet ? [wallet] : [])
    if (walletList.length > 0) {
      const startIndex = values.length + 1
      const placeholders = walletList.map((_, i) => `$${startIndex + i}`).join(', ')
      where.push(`ob.wallet IN (${placeholders})`)
      values.push(...walletList)
    }

    pushWhere('ob.txid =', txid)
    pushWhere('px.end2end =', end2end)
    pushWhere('px."destinationKey" =', destinationKey)
    pushWhere('px."payerDocument" =', payerDocument)

    if (payerName) {
      values.push(`%${payerName}%`)
      where.push(`px."PayerName" ILIKE $${values.length}`)
    }

    pushWhere('px."status" =', status_bank)
    pushWhere('ob.status =', status_blockchain)
    pushWhere('ob."typeIn" =', typeIn)

    if (min_amount !== undefined) {
      values.push(min_amount)
      where.push(`px."amount" >= $${values.length}`)
    }
    if (max_amount !== undefined) {
      values.push(max_amount)
      where.push(`px."amount" <= $${values.length}`)
    }

    if (created_after) {
      values.push(created_after)
      where.push(`px."createdAt" >= $${values.length}`)
    }
    if (created_before) {
      values.push(created_before)
      where.push(`px."createdAt" <= $${values.length}`)
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''

    const select = `
      SELECT 
        ob.id,
        aw.id AS wallet_id,
        ob.txid,
        ob.wallet AS receive_wallet,
        aw."name" AS receive_name,
        aw."document" AS receive_doc,
        px."destinationKey",
        px.end2end,
        px."PayerName" AS payer_name,
        px."payerDocument" as payer_document,
        px."amount",
        px."status" AS status_bank,
        ob.status AS status_blockchain,
        ob."msgError" AS msg_error_blockchain,
        px."msgError" AS msg_error_bank,
        px."createdAt"::text AS "createdAt",
        ob."typeIn"
      FROM "orderSell" AS ob
      LEFT JOIN "pixIn" AS px ON px.id = ob."pixInId"
      LEFT JOIN "aclWallets" AS aw ON aw.wallet = ob.wallet OR aw."btcWallet" = ob.wallet OR aw."liquidWallet" = ob.wallet
    `

    const orderLimit = `
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `

    const query = `${select} ${whereClause} ${orderLimit}`

    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM "orderSell" AS ob
      LEFT JOIN "pixIn" AS px ON px.id = ob."pixInId"
      LEFT JOIN "aclWallets" AS aw ON aw.wallet = ob.wallet OR aw."btcWallet" = ob.wallet OR aw."liquidWallet" = ob.wallet
      ${whereClause}
    `

    const client = await this.getClient()
    try {
      const result = await client.query(query, [...values, limit, offset])
      const count = await client.query(countQuery, values)
      return {
        data: result.rows as PixInTransaction[],
        total: Number(count.rows[0]?.total ?? 0),
        page,
        limit,
      }
    } finally {
      client.release()
    }
  }
}
