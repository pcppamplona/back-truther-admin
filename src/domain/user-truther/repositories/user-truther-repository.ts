import type { DecisionKycStatus, UserTrutherWithWallet } from '../model/user-truther'
import { UserDetailedInfo } from '../model/user-detailed-info'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export interface UserTrutherPaginationParams extends PaginationParams {
  address?: string
  custodian?: 'TRUTHER_APP' | 'BITFINEXAC1'
}

export interface UsersTrutherRepository {
  updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void>
  findPaginatedWithWallets(params: UserTrutherPaginationParams): Promise<PaginatedResult<UserTrutherWithWallet>>
  findDetailedUserInfoById(userId: number): Promise<UserDetailedInfo | null>
}
