import { PolicyEnforcer } from '@/application/services/policy-enforcer'
import { AuditLog } from '@/domain/audit-logs/model/audit-log'
import { AuditLogPaginationParams } from '@/domain/audit-logs/model/audit-log-pagination-params'
import { AuditLogPolicy } from '@/domain/audit-logs/policies/audit-log-policy'
import { AuditLogsRepository } from '@/domain/audit-logs/repositories/audit-logs-repository'
import { PolicyContext } from '@/domain/policies/repositories/policy'
import { PaginatedResult } from '@/shared/pagination'

// export class ListAuditLogsPaginatedUseCase {
//   constructor(private auditLogsRepository: AuditLogsRepository) {}

//   async execute(params: AuditLogPaginationParams): Promise<PaginatedResult<AuditLog>> {
//     return this.auditLogsRepository.findPaginated(params)
//   }
// }

export class ListAuditLogsPaginatedUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(
    params: AuditLogPaginationParams & {
      userId: number
      roleId: number
    }
  ): Promise<PaginatedResult<AuditLog>> {
    const { userId, roleId, ...queryParams } = params

    const policy = new AuditLogPolicy()
    const enforcer = new PolicyEnforcer<AuditLog>(policy)

    const context: PolicyContext = { userId, roleId }

    // aplica restrições SQL (pré-query)
    const policyFilter = await enforcer.buildQueryFilter(context)

    const result = await this.auditLogsRepository.findPaginated({
      ...queryParams,
      ...policyFilter,
    })

    // aplica restricao pos-query
    result.data = await enforcer.filter(context, result.data)

    return result
  }
}