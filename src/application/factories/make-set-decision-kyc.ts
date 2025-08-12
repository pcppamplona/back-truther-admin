import { PgUserRepository } from '@/infra/db/repositories/pg/pg-user-repository'

import { SetDecisionKycUseCase } from '../use-cases/set-decision-kyc'

export function makeSetDecisionKycUseCase() {
  const usersRepository = new PgUserRepository()
  const setDecisionKycUseCase = new SetDecisionKycUseCase(usersRepository)

  return setDecisionKycUseCase
}
