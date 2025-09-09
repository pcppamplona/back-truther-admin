import { PgSystemsRepository } from '@/infra/db/repositories/pg/pg-systems-repository'
import { GetSystemUseCase } from '../../use-cases/systems/get-system'

export function makeGetSystemUseCase() {
  const repo = new PgSystemsRepository()
  return new GetSystemUseCase(repo)
}