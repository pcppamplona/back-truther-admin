interface DecisionKycStatus {
  id: number
  kyc_approved: boolean
  banking_enable: boolean
  comment_kyc?: string
  stage_kyc?: number
}

export { DecisionKycStatus }
