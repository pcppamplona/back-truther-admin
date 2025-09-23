import { PgAuditLogsRepository } from '@/infra/db/repositories/pg/pg-audit-logs-repository'
import { GetAuditLogByIdUseCase } from '../../use-cases/audit-logs/get-audit-log-by-id'

export function makeGetAuditLogByIdUseCase() {
  const repo = new PgAuditLogsRepository()
  return new GetAuditLogByIdUseCase(repo)
}