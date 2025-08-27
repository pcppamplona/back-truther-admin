import { UserDetailedInfo } from '@/domain/user-truther/model/user-detailed-info'
import { UsersTrutherRepository } from '@/domain/user-truther/repositories/user-truther-repository'

export interface GetUserDetailedInfoUseCaseRequest {
  userId: number
}

export class GetUserDetailedInfoUseCase {
  constructor(private usersTrutherRepository: UsersTrutherRepository) {}

  async execute({ userId }: GetUserDetailedInfoUseCaseRequest): Promise<UserDetailedInfo | null> {
    return this.usersTrutherRepository.findDetailedUserInfoById(userId)
  }
}