export interface Customer {
  id: number
  uuid: string
  onboardingId: string
  fullName: string
  socialName: string
  motherName: string
  documentNumber: string
  phoneNumber: string
  email: string
  typePerson: string
  status: string
  isPoliticallyExposedPerson: boolean
  businessId: string
  createdAt: Date
  updateAt: Date
  deleteAt: Date | null
  authenticationId: string
  createKeyPix: boolean
  walletAddress: string
  birthDate: string
}