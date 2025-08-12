import { PgUserInfoRepository } from '@/infra/db/repositories/pg/pg-user-info-repository'
import { GetUserInfoByDocumentUseCase } from '../use-cases/get-user-info-by-document'

export function makeGetUserInfoByDocumentUseCase() {
  const repo = new PgUserInfoRepository()
  return new GetUserInfoByDocumentUseCase(repo)
}
