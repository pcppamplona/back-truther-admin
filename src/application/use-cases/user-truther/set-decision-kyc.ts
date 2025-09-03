import type { User } from '@/domain/user/model/user'
import { UsersTrutherRepository } from '@/domain/user-truther/repositories/user-truther-repository'

interface Input {
  id: number
  decision: boolean
  internalComment?: string
  externalComment?: string
}

interface Output extends Pick<User, 'id'> {}

export class SetDecisionKycUseCase {
  constructor(private usersTrutherRepository: UsersTrutherRepository) {}

  async execute({ id, decision, internalComment }: Input): Promise<Output> {
    await this.usersTrutherRepository.updateKycStatus({
      id,
      kyc_approved: decision,
      banking_enable: decision,
      comment_kyc: internalComment,
      stage_kyc: decision ? 2 : 4,
    })

    return { id }
  }
}
