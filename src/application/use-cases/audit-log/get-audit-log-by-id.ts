import { AuditLog } from '@/domain/audit-log/model/audit-log'
import { AuditLogRepository } from '@/domain/audit-log/repositories/audit-log-repository'

export class GetAuditLogByIdUseCase {
  constructor(private auditLogRepository: AuditLogRepository) {}

  async execute(id: number): Promise<AuditLog | null> {
    return this.auditLogRepository.findById(id)
  }
}