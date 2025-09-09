import { PgSystemsRepository } from '@/infra/db/repositories/pg/pg-systems-repository'
import { CreateSystemUseCase } from '../../use-cases/systems/create-system'

export function makeCreateSystemUseCase() {
  const repo = new PgSystemsRepository()
  return new CreateSystemUseCase(repo)
}