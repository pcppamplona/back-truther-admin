import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { GetUserInfoByDocumentUseCase } from '../../use-cases/clients/get-user-info-by-document'
import { PoolClient } from 'pg'

export function makeGetUserInfoByDocumentUseCase(client?: PoolClient) {
  const repo = new PgUserInfoRepository(client)
  return new GetUserInfoByDocumentUseCase(repo)
}
