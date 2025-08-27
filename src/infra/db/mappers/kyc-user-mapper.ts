import { KycUser } from '@/domain/user-truther/model/kyc-user'

export class KycUserMapper {
  static toKycUser(row: any): KycUser | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      uuid: row.uuid,
      document: row.document,
      provider: row.provider,
      statusOcr: row.statusOcr,
      statusBcc: row.statusBcc,
      url: row.url,
      internalMsg: row.internalMsg,
      active: row.active,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      userId: row.userId,
      kycOnboarding: row.kycOnboarding,
      getFiles: row.getFiles
    }
  }
}