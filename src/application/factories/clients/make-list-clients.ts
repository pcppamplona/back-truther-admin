import { PgClientsRepository } from '@/infra/db/repositories/pg/pg-clients-repository'
import { ListClientsUseCase } from '../../use-cases/clients/list-clients'
import { PoolClient } from 'pg'

export function makeListClientsUseCase(client?: PoolClient) {
  const repo = new PgClientsRepository(client)
  return new ListClientsUseCase(repo)
}
