import type { DecisionKycStatus, UserTrutherWithWallet } from '../../model/user-truther'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export interface UsersTrutherRepository {
  updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void>
  findPaginatedWithWallets(params: PaginationParams): Promise<PaginatedResult<UserTrutherWithWallet>>
}
