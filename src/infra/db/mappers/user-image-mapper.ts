import { UserImage } from '@/domain/user-truther/model/user-image'

export class UserImageMapper {
  static toUserImage(row: any): UserImage {
    return {
      id: row.id,
      user_id: row.user_id,
      link: row.link,
      type: row.type,
      created_at: row.created_at,
      updated_at: row.updated_at,
      enable: row.enable,
      kycId: row.kycId,
      kyc_id: row.kyc_id
    }
  }
  
  static toUserImages(rows: any[]): UserImage[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toUserImage(row))
  }
}