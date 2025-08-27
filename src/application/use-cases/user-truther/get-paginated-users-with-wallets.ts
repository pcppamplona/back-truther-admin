import { PaginatedResult, PaginationParams } from '@/shared/pagination'
import { UserTrutherWithWallet } from '@/domain/user-truther/model/user-truther'
import { UsersTrutherRepository } from '@/domain/user-truther/repositories/user-truther-repository'

export interface GetPaginatedUsersWithWalletsUseCaseRequest {
  page: number
  limit: number
  address?: string
  custodian?: 'TRUTHER_APP' | 'BITFINEXAC1'
}

export class GetPaginatedUsersWithWalletsUseCase {
  constructor(private usersTrutherRepository: UsersTrutherRepository) {}

  async execute({ page, limit, address, custodian }: GetPaginatedUsersWithWalletsUseCaseRequest): Promise<PaginatedResult<UserTrutherWithWallet>> {
    const validPage = Math.max(1, page || 1)
    const validLimit = Math.max(1, Math.min(100, limit || 10))

    return this.usersTrutherRepository.findPaginatedWithWallets({
      page: validPage,
      limit: validLimit,
      address,
      custodian,
    })
  }
}