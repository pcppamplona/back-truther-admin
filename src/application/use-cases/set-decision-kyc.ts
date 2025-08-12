import { hash } from 'bcrypt'

import type { DecisionKycStatus, User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { BadRequestError } from '@/errors/bad-request-error'

interface Input extends Omit<DecisionKycStatus, 'passwordHash'> {
  password: string
}

interface Output extends Pick<User, 'id'> {}

export class SetDecisionKycUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    decision,
    internalComment,
    externalComment,
  }: Input): Promise<Output> {
    const user = await this.usersRepository.updateKycStatus({
      id,
      kyc_approved: decision,
      banking_enable: decision,
      comment_kyc: internalComment,
    })

    return { id: user.id }
  }
}
