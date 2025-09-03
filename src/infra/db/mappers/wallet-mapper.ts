import { Wallet } from '@/domain/user-truther/model/user-truther'

export class WalletMapper {
  static toWallet(row: any): Wallet | null {
    if (!row.wallet_id) {
      return null
    }
    
    return {
      id: row.wallet_id,
      address: row.address,
      device_id: row.device_id,
      user_id: row.user_id,
      salt: row.salt,
      created_at: row.wallet_created_at,
      updated_at: row.wallet_updated_at,
      type: row.type,
      locked_balance: row.locked_balance,
      balance: row.balance,
      protocol: row.protocol,
      custodian: row.custodian,
      new_wallet: row.new_wallet,
      usdtBalance: row.usdtBalance,
      usdtLockedBalance: row.usdtLockedBalance
    }
  }
}