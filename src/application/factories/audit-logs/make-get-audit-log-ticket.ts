import { GetAuditLogTicketUseCase } from "@/application/use-cases/audit-logs/get-audit-log-ticket"
import { PgAuditLogsRepository } from "@/infra/db/repositories/pg/pg-audit-logs-repository"

export function makeGetAuditLogTicketUseCase() {
  const repo = new PgAuditLogsRepository()
  return new GetAuditLogTicketUseCase(repo)
}