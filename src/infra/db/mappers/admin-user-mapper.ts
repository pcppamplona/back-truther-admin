import { User } from '@/domain/user/model/user'

export class AdminUserMapper {
  static toUser(row: any): User | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      uuid: row.uuid,
      name: row.name,
      username: row.username,
      password: row.password,
      active: row.active,
      created_at: row.createdAt || row.created_at,
      updated_at: row.updatedAt || row.updated_at,
      deleted_at: row.deletedAt || row.deleted_at,
      forceReset_pwd: row.forceResetPwd || row.force_reset_pwd,
      type_auth: row.typeAuth || row.type_auth,
      group_level: row.groupLevel || row.group_level
    }
  }

  static toUserList(rows: any[]): User[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toUser(row)).filter((user): user is User => user !== null)
  }
}