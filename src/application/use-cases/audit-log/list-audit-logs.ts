import { AuditLog } from '@/domain/audit-log/model/audit-log'
import { AuditLogRepository } from '@/domain/audit-log/repositories/audit-log-repository'

export class ListAuditLogsUseCase {
  constructor(private auditLogRepository: AuditLogRepository) {}

  async execute(): Promise<AuditLog[]> {
    return this.auditLogRepository.findAll()
  }
}