import { AuditLog, ActionType, SystemType } from '../model/audit-log'
import { AuditLogPaginationParams } from '../model/audit-log-pagination-params'
import { PaginatedResult } from '@/shared/pagination'

export interface CreateAuditLogData {
  method: string
  action: ActionType
  message: string
  description?: string
  sender_type: SystemType
  sender_id: string
  target_type: SystemType
  target_id: string
  target_external_id?: number
}

export interface AuditLogsRepository {
  create(data: CreateAuditLogData): Promise<AuditLog>
  findAll(): Promise<AuditLog[]>
  findById(id: number): Promise<AuditLog | null>
  findPaginated(params: AuditLogPaginationParams): Promise<PaginatedResult<AuditLog>>
  findByTicketId(ticket_id: number): Promise<AuditLog[] | null>
  findPaginatedByUserId(user_id: number, params: AuditLogPaginationParams): Promise<PaginatedResult<AuditLog>>;
}