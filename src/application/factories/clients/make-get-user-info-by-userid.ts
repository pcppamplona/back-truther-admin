import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { GetUserInfoByUserIdUseCase } from '../../use-cases/clients/get-user-info-by-userid'
import { PoolClient } from 'pg'

export function makeGetUserInfoByUserIdUseCase(client?: PoolClient) {
  const repo = new PgUserInfoRepository(client)
  return new GetUserInfoByUserIdUseCase(repo)
}
