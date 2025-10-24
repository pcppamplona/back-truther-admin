import { AuditLog } from "@/domain/audit-logs/model/audit-log"
import { Policy, PolicyContext } from "@/domain/policies/repositories/policy"

export class AuditLogPolicy implements Policy<AuditLog> {
  async filterQuery(context: PolicyContext) {
    const { roleId } = context

    switch (roleId) {
      case 6: // Admin N6
        return {} // sem restrição
      case 2: // N2
        return { action: "crm" }
      case 3: // N3
        return { action: "security" }
      default:
        return { id: -1 }
    }
  }

  async canRead(context: PolicyContext, record: AuditLog) {
    const { roleId } = context
    if (roleId === 6) return true
    if (roleId === 2) return record.action === "crm"
    if (roleId === 3) return record.action === "security"
    
    return false
  }
}
