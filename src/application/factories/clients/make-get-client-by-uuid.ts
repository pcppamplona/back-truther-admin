import { PgClientsRepository } from '@/infra/db/repositories/pg/pg-clients-repository'
import { GetClientByUuidUseCase } from '../../use-cases/clients/get-client-by-uuid'
import { PoolClient } from "pg"

export function makeGetClientByUuidUseCase(client?: PoolClient) {
  const repo = new PgClientsRepository(client)
  return new GetClientByUuidUseCase(repo)
}
