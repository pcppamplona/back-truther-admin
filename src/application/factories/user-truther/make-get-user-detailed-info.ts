import { GetUserDetailedInfoUseCase } from '@/application/use-cases/user-truther/get-user-detailed-info'
import { PgUserTrutherRepository } from '@/infra/db/repositories/pg/pg-user-truther-repository'

export function makeGetUserDetailedInfoUseCase() {
  const pgUserTrutherRepository = new PgUserTrutherRepository()
  const getUserDetailedInfoUseCase = new GetUserDetailedInfoUseCase(pgUserTrutherRepository)
  
  return getUserDetailedInfoUseCase
}