import { UserInfo } from '@/domain/clients/model/userinfo'

export class UserInfoMapper {
  static toUserInfo(row: any): UserInfo | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      user_id: row.user_id,
      name: row.name,
      document: row.document,
      document_type: row.document_type,
      email: row.email,
      phone: row.phone,
      nationality: row.nationality,
      cep: row.cep,
      city: row.city,
      state: row.state,
      neighborhood: row.neighborhood,
      street: row.street,
      location: row.location,
      flags: row.flags,
      created_at: row.created_at,
      updated_at: row.updated_at,
      house_number: row.house_number,
      mothersName: row.mothersName,
      birthday: row.birthday,
      active: row.active,
      uuid: row.uuid
    }
  }
}