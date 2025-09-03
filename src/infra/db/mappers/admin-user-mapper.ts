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
      createdAt: row.createdAt || row.created_at,
      updatedAt: row.updatedAt || row.updated_at,
      deletedAt: row.deletedAt || row.deleted_at,
      forceResetPwd: row.forceResetPwd || row.force_reset_pwd,
      typeAuth: row.typeAuth || row.type_auth,
      groupLevel: row.groupLevel || row.group_level
    }
  }

  static toUserList(rows: any[]): User[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toUser(row)).filter((user): user is User => user !== null)
  }
}