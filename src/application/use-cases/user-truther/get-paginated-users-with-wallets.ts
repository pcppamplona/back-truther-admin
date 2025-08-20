import { PaginatedResult, PaginationParams } from '@/shared/pagination'
import { UserTrutherWithWallet } from '@/domain/user/model/user-truther'
import { UsersTrutherRepository } from '@/domain/user/repositories/user-truther/user-truther-repository'

export interface GetPaginatedUsersWithWalletsUseCaseRequest {
  page: number
  limit: number
}

export class GetPaginatedUsersWithWalletsUseCase {
  constructor(private usersTrutherRepository: UsersTrutherRepository) {}

  async execute({ page, limit }: GetPaginatedUsersWithWalletsUseCaseRequest): Promise<PaginatedResult<UserTrutherWithWallet>> {
    const validPage = Math.max(1, page || 1)
    const validLimit = Math.max(1, Math.min(100, limit || 10))

    return this.usersTrutherRepository.findPaginatedWithWallets({
      page: validPage,
      limit: validLimit,
    })
  }
}