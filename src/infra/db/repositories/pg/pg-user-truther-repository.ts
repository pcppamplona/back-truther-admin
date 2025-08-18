import type { DecisionKycStatus } from '@/domain/user/model/user-truther'
import { UsersTrutherRepository } from '@/domain/user/repositories/user-truther/user-truther-repository'

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
}
