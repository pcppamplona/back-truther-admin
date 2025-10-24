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
      type_auth: row.typeAuth || row.type_auth,
      // group_level: row.groupLevel || row.group_level,
      role_id: row.role_id
    }
  }

  static toUserList(rows: any[]): User[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toUser(row)).filter((user): user is User => user !== null)
  }
}