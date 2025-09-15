import { PgAuditLogsRepository } from '@/infra/db/repositories/pg/pg-audit-logs-repository'
import { CreateAuditLogUseCase } from '../../use-cases/audit-logs/create-audit-log'

export function makeCreateAuditLogUseCase() {
  const repo = new PgAuditLogsRepository()
  return new CreateAuditLogUseCase(repo)
}