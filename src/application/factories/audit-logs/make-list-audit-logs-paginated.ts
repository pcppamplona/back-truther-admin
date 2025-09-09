import { PgAuditLogsRepository } from '@/infra/db/repositories/pg/pg-audit-logs-repository'
import { ListAuditLogsPaginatedUseCase } from '../../use-cases/audit-logs/list-audit-logs-paginated'

export function makeListAuditLogsPaginatedUseCase() {
  const repo = new PgAuditLogsRepository()
  return new ListAuditLogsPaginatedUseCase(repo)
}