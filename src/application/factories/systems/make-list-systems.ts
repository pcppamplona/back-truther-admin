import { PgSystemsRepository } from '@/infra/db/repositories/pg/pg-systems-repository'
import { ListSystemsUseCase } from '../../use-cases/systems/list-systems'

export function makeListSystemsUseCase() {
  const repo = new PgSystemsRepository()
  return new ListSystemsUseCase(repo)
}