import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { GetUserInfoByUserIdUseCase } from '../../use-cases/clients/get-user-info-by-userid'

export function makeGetUserInfoByUserIdUseCase() {
  const repo = new PgUserInfoRepository()
  return new GetUserInfoByUserIdUseCase(repo)
}
