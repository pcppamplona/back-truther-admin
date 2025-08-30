import { GetUserTrutherByIdUseCase } from '@/application/use-cases/user-truther/get-user-detailed-info'
import { PgUserTrutherRepository } from '@/infra/db/repositories/pg/pg-user-truther-repository'

export function makeGetUserTrutherByIdUseCase() {
  const pgUserTrutherRepository = new PgUserTrutherRepository()
  const getUserTrutherByIdUseCase = new GetUserTrutherByIdUseCase(pgUserTrutherRepository)
  
  return getUserTrutherByIdUseCase
}