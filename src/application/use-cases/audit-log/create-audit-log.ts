import { AuditLog } from '@/domain/audit-log/model/audit-log'
import { AuditLogRepository, CreateAuditLogData } from '@/domain/audit-log/repositories/audit-log-repository'

export class CreateAuditLogUseCase {
  constructor(private auditLogRepository: AuditLogRepository) {}

  async execute(data: CreateAuditLogData): Promise<AuditLog> {
    return this.auditLogRepository.create(data)
  }
}