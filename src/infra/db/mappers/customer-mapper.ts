import { Customer } from '@/domain/user-truther/model/customer'

export class CustomerMapper {
  static toCustomer(row: any): Customer | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      uuid: row.uuid,
      onboardingId: row.onboardingId,
      fullName: row.fullName,
      socialName: row.socialName,
      motherName: row.motherName,
      documentNumber: row.documentNumber,
      phoneNumber: row.phoneNumber,
      email: row.email,
      typePerson: row.typePerson,
      status: row.status,
      isPoliticallyExposedPerson: row.isPoliticallyExposedPerson,
      businessId: row.businessId,
      createdAt: row.createdAt,
      updateAt: row.updateAt,
      deleteAt: row.deleteAt,
      authenticationId: row.authenticationId,
      createKeyPix: row.createKeyPix,
      walletAddress: row.walletAddress,
      birthDate: row.birthDate
    }
  }
}