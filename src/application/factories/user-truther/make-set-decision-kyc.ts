import { PgUserTrutherRepository } from '@/infra/db/repositories/pg/pg-user-truther-repository'

import { SetDecisionKycUseCase } from '../../use-cases/user-truther/set-decision-kyc'

export function makeSetDecisionKycUseCase() {
  const userTrutherRepository = new PgUserTrutherRepository()
  const setDecisionKycUseCase = new SetDecisionKycUseCase(userTrutherRepository)

  return setDecisionKycUseCase
}
