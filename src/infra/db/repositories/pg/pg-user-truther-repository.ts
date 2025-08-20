import type { DecisionKycStatus, UserTrutherWithWallet } from '@/domain/user/model/user-truther'
import { UsersTrutherRepository } from '@/domain/user/repositories/user-truther/user-truther-repository'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

import { PostgresDatabase } from '../../pg/connection'

export class PgUserTrutherRepository implements UsersTrutherRepository {
  async updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void> {
    const client = await PostgresDatabase.getClient('truther')

    try {
      await client.query(
        `UPDATE public.users
         SET kyc_approved = $2,
             banking_enable = $3,
             comment_kyc = $4,
             stage_kyc = $5
         WHERE id = $1`,
        [
          decisionKycStatus.id,
          decisionKycStatus.kyc_approved,
          decisionKycStatus.banking_enable,
          decisionKycStatus.comment_kyc ?? null,
          decisionKycStatus.stage_kyc ?? null,
        ],
      )
    } finally {
      client.release()
    }
  }

  async findPaginatedWithWallets({ page, limit }: PaginationParams): Promise<PaginatedResult<UserTrutherWithWallet>> {
    const client = await PostgresDatabase.getClient('truther')
    try {
      const offset = (page - 1) * limit
      
      const countResult = await client.query('SELECT COUNT(*) FROM public.users')
      const total = parseInt(countResult.rows[0].count, 10)
      
      const result = await client.query(
        `SELECT 
          u.id, 
          u.name, 
          u.role, 
          u.is_verified, 
          u.can_transact, 
          u.status, 
          u.fee_level_id, 
          u.created_at, 
          u.updated_at, 
          u.flags, 
          u.expo_id, 
          u.kyc_approved, 
          u.kyc_risk, 
          u.banking_enable, 
          u.disinterest, 
          u.register_txid, 
          u.called_attempts_guenno, 
          u.stage_kyc, 
          u.comment_kyc, 
          u."providerKyc", 
          u."attemptsKyc", 
          u.password, 
          u."ipCreate", 
          u.error, 
          u.restrict, 
          u.override_instant_pay, 
          u.uuid, 
          u."lastLogin", 
          u."lastIpLogin", 
          u."retryKyc", 
          u."regenerateKyc", 
          u.master_instant_pay,
          w.id as wallet_id, 
          w.address, 
          w.device_id, 
          w.user_id, 
          w.salt, 
          w.created_at as wallet_created_at, 
          w.updated_at as wallet_updated_at, 
          w.type, 
          w.locked_balance, 
          w.balance, 
          w.protocol, 
          w.custodian, 
          w.new_wallet, 
          w."usdtBalance", 
          w."usdtLockedBalance"
        FROM public.users u
        LEFT JOIN public.wallets w ON u.id = w.user_id
        ORDER BY u.id
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
      
      return {
        data: result.rows,
        total,
        page,
        limit
      }
    } finally {
      client.release()
    }
  }
}
