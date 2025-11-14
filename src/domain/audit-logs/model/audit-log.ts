export type ActionType = 'security' | 'listing' | 'alter' | 'crm' | 'export'
export type SystemType = 'GUENO' | 'ADMIN' | 'USER_CLIENT' | 'USER' | 'CLIENT'
export type Severity = 'low' | 'medium' | 'high'

export interface AuditLog {
  id: number
  method: string
  action: ActionType
  message: string
  description: string | null
  created_at: string
  sender_type: SystemType
  sender_id: string
  sender_name?: string
  target_type: SystemType
  target_id: string
  target_name?: string
  target_external_id?: string
  severity: Severity
}