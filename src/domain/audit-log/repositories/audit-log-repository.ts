import { AuditLog } from '../model/audit-log'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export interface CreateAuditLogData {
  method: string
  action: AuditLog['action']
  message: string
  description?: string
  senderType: AuditLog['senderType']
  senderId: string
  targetType: AuditLog['targetType']
  targetId: string
}

export interface AuditLogRepository {
  create(data: CreateAuditLogData): Promise<AuditLog>
  findAll(): Promise<AuditLog[]>
  findById(id: number): Promise<AuditLog | null>
  findPaginated(params: PaginationParams): Promise<PaginatedResult<AuditLog>>
}