import { AuditLogsRepository } from "@/domain/audit-logs/repositories/audit-logs-repository";
import { AuditLogPaginationParams } from "@/domain/audit-logs/model/audit-log-pagination-params";
import { PaginatedResult } from "@/shared/pagination";
import { AuditLog } from "@/domain/audit-logs/model/audit-log";

export class GetPaginatedAuditLogsByUserIdUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(
    user_id: number,
    params: AuditLogPaginationParams
  ): Promise<PaginatedResult<AuditLog>> {
    return this.auditLogsRepository.findPaginatedByUserId(user_id, params);
  }
}
