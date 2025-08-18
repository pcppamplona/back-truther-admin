import type { DecisionKycStatus } from '../../model/user-truther'

export interface UsersTrutherRepository {
  updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void>
}
