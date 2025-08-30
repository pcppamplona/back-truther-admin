import { UserDetailedInfo } from '@/domain/user-truther/model/user-detailed-info'
import { UsersTrutherRepository } from '@/domain/user-truther/repositories/user-truther-repository'

export interface GetUserTrutherByIdUseCaseRequest {
  userId: number
}

export class GetUserTrutherByIdUseCase {
  constructor(private usersTrutherRepository: UsersTrutherRepository) {}

  async execute({ userId }: GetUserTrutherByIdUseCaseRequest): Promise<UserDetailedInfo | null> {
    return this.usersTrutherRepository.findUserTrutherById(userId)
  }
}