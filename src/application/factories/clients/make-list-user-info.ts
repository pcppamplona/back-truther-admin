import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { ListUserInfoUseCase } from '../../use-cases/clients/list-user-info'

export function makeListUserInfoUseCase() {
  const repo = new PgUserInfoRepository()
  return new ListUserInfoUseCase(repo)
}
