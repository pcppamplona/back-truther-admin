import { PgUserRepository } from '@/infra/db/repositories/pg/pg-user-repository'

import { CreateUserUseCase } from '../use-cases/create-user'

export function makeCreateUserUseCase() {
  const usersRepository = new PgUserRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
