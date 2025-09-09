export type SystemType = "GUENO" | "ADMIN" | "USER_CLIENT" | "USER" | "CLIENT"

export type ActionType = "security" | "listing" | "alter" | "crm"

export interface AuditLog {
  id: number
  method: string // http method
  action: ActionType
  message: string
  description?: string // not required
  createdAt: string // timestamp
  senderType: SystemType
  senderId: string // who generated the log
  targetType: SystemType
  targetId: string
}