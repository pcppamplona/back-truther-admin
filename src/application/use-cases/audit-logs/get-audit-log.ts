import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogsRepository } from '@/domain/audit-logs/repositories/audit-logs-repository'

export class GetAuditLogUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(id: number): Promise<AuditLog | null> {
    return this.auditLogsRepository.findById(id)
  }
}