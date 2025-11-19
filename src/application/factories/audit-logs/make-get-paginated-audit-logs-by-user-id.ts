import { GetPaginatedAuditLogsByUserIdUseCase } from "@/application/use-cases/audit-logs/get-audit-logs-by-user-id-paginated";
import { PgAuditLogsRepository } from "@/infra/db/repositories/pg/pg-audit-logs-repository";

export function makeGetPaginatedAuditLogsByUserIdUseCase() {
  const repo = new PgAuditLogsRepository();
  return new GetPaginatedAuditLogsByUserIdUseCase(repo);
}
