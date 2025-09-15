import { AuditLogService } from '@/application/services/audit-log-service'
import { makeCreateAuditLogUseCase } from './make-create-audit-log'

export function makeAuditLogService() {
  const createAuditLogUseCase = makeCreateAuditLogUseCase()
  return new AuditLogService(createAuditLogUseCase)
}