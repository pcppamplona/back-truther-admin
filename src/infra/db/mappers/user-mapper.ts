import { UserTrutherWithWallet } from '@/domain/user-truther/model/user-truther'

export class UserMapper {
  static toUserTrutherWithWallet(row: any): UserTrutherWithWallet {
    return {
      id: row.id,
      name: row.name,
      role: row.role,
      is_verified: row.is_verified,
      can_transact: row.can_transact,
      status: row.status,
      fee_level_id: row.fee_level_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      flags: row.flags,
      expo_id: row.expo_id,
      kyc_approved: row.kyc_approved,
      kyc_risk: row.kyc_risk,
      banking_enable: row.banking_enable,
      disinterest: row.disinterest,
      register_txid: row.register_txid,
      called_attempts_guenno: row.called_attempts_guenno,
      stage_kyc: row.stage_kyc,
      comment_kyc: row.comment_kyc,
      providerKyc: row.providerKyc,
      attemptsKyc: row.attemptsKyc,
      password: row.password,
      ipCreate: row.ipCreate,
      error: row.error,
      restrict: row.restrict,
      override_instant_pay: row.override_instant_pay,
      uuid: row.uuid,
      lastLogin: row.lastLogin,
      lastIpLogin: row.lastIpLogin,
      retryKyc: row.retryKyc,
      regenerateKyc: row.regenerateKyc,
      master_instant_pay: row.master_instant_pay,
      wallets: []
    }
  }
}