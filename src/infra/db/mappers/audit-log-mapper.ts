import { AuditLog, ActionType, SystemType } from '@/domain/audit-logs/model/audit-log'

export class AuditLogMapper {
  static toAuditLog(row: any): AuditLog | null {
    if (!row) {
      return null
    }
    
    return {
      id: row.id,
      method: row.method,
      action: row.action as ActionType,
      message: row.message,
      description: row.description,
      created_at: row.created_at,
      sender_type: row.sender_type as SystemType,
      sender_id: row.sender_id,
      target_type: row.target_type as SystemType,
      target_id: row.target_id
    }
  }

  static toAuditLogList(rows: any[]): AuditLog[] {
    if (!rows || rows.length === 0) {
      return []
    }
    
    return rows.map(row => this.toAuditLog(row)).filter((log): log is AuditLog => log !== null)
  }
}