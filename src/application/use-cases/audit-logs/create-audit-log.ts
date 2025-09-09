import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogsRepository, CreateAuditLogData } from '@/domain/audit-logs/repositories/audit-logs-repository'

export class CreateAuditLogUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(data: CreateAuditLogData): Promise<AuditLog> {
    return this.auditLogsRepository.create(data)
  }
}