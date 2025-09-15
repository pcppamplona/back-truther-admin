import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogsRepository } from '@/domain/audit-logs/repositories/audit-logs-repository'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export class ListAuditLogsPaginatedUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<AuditLog>> {
    return this.auditLogsRepository.findPaginated(params)
  }
}