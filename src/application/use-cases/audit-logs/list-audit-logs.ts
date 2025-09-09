import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogsRepository } from '@/domain/audit-logs/repositories/audit-logs-repository'

export class ListAuditLogsUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(): Promise<AuditLog[]> {
    return this.auditLogsRepository.findAll()
  }
}