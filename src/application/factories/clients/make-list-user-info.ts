import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { ListUserInfoUseCase } from '../../use-cases/clients/list-user-info'
import { PoolClient } from 'pg'

export function makeListUserInfoUseCase(client?: PoolClient) {
  const repo = new PgUserInfoRepository(client)
  return new ListUserInfoUseCase(repo)
}
