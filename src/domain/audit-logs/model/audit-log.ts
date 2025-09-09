export type ActionType = 'security' | 'listing' | 'alter' | 'crm'
export type SystemType = 'GUENO' | 'ADMIN' | 'USER_CLIENT' | 'USER' | 'CLIENT'

export interface AuditLog {
  id: number
  method: string
  action: ActionType
  message: string
  description: string | null
  created_at: string
  sender_type: SystemType
  sender_id: string
  target_type: SystemType
  target_id: string
}