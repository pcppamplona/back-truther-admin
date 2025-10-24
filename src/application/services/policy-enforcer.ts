import { Policy, PolicyContext } from "@/domain/policies/repositories/policy"

export class PolicyEnforcer<T = any> {
  constructor(private readonly policy: Policy<T>) {}

  async buildQueryFilter(context: PolicyContext): Promise<Record<string, any>> {
    if (this.policy.filterQuery) {
      const result = await this.policy.filterQuery(context)
      return result ?? {}
    }
    return {}
  }

  async filter(context: PolicyContext, records: T[]): Promise<T[]> {
    if (!this.policy.canRead) return records
    const result: T[] = []
    for (const r of records) {
      const allowed = await this.policy.canRead(context, r)
      if (allowed) result.push(r)
    }
    return result
  }
}
