export interface KycUser {
  id: number
  uuid: string
  document: string
  provider: string
  statusOcr: string
  statusBcc: string
  url: string
  internalMsg: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  userId: number
  kycOnboarding: string
  getFiles: boolean
}