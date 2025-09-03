interface DecisionKycStatus {
  id: number
  kyc_approved: boolean
  banking_enable: boolean
  comment_kyc?: string
  stage_kyc?: number
}

interface Wallet {
  id: number
  address: string
  device_id: string
  user_id: number
  salt: string
  created_at: Date
  updated_at: Date
  type: string
  locked_balance: number
  balance: number
  protocol: string
  custodian: string
  new_wallet: boolean
  usdtBalance: number
  usdtLockedBalance: number
}

interface UserTrutherWithWallet {
  id: number
  name: string
  role: string
  is_verified: boolean
  can_transact: boolean
  status: string
  fee_level_id: number
  created_at: Date
  updated_at: Date
  flags: any
  expo_id: string
  kyc_approved: boolean
  kyc_risk: string
  banking_enable: boolean
  disinterest: boolean
  register_txid: string
  called_attempts_guenno: number
  stage_kyc: number
  comment_kyc: string
  providerKyc: string
  attemptsKyc: number
  password: string
  ipCreate: string
  error: string
  restrict: boolean
  override_instant_pay: boolean
  uuid: string
  lastLogin: Date
  lastIpLogin: string
  retryKyc: boolean
  regenerateKyc: boolean
  master_instant_pay: boolean

  wallets: Wallet[]
}

export { DecisionKycStatus, UserTrutherWithWallet, Wallet }
