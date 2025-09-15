import { PgAuditLogsRepository } from '@/infra/db/repositories/pg/pg-audit-logs-repository'
import { ListAuditLogsUseCase } from '../../use-cases/audit-logs/list-audit-logs'

export function makeListAuditLogsUseCase() {
  const repo = new PgAuditLogsRepository()
  return new ListAuditLogsUseCase(repo)
}