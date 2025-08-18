import { PgClientsRepository } from '@/infra/db/repositories/pg/pg-clients-repository'
import { ListClientsUseCase } from '../use-cases/list-clients'

export function makeListClientsUseCase() {
  const repo = new PgClientsRepository()
  return new ListClientsUseCase(repo)
}
