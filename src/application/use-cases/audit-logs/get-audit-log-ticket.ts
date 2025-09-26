import { AuditLog } from "@/domain/audit-logs/model/audit-log";
import { AuditLogsRepository } from "@/domain/audit-logs/repositories/audit-logs-repository";

export class GetAuditLogTicketUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(ticket_id: number): Promise<AuditLog[] | null> {
    return this.auditLogsRepository.findByTicketId(ticket_id)
  }
}