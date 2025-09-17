import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogPaginationParams } from '@/domain/audit-logs/model/audit-log-pagination-params'
import { AuditLogsRepository } from '@/domain/audit-logs/repositories/audit-logs-repository'
import { PaginatedResult } from '@/shared/pagination'

export class ListAuditLogsPaginatedUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(params: AuditLogPaginationParams): Promise<PaginatedResult<AuditLog>> {
    return this.auditLogsRepository.findPaginated(params)
  }
}