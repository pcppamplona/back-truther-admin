import { PgUserRepository } from '@/infra/db/repositories/pg/pg-user-repository'

import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PgUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
