import { PgClientsRepository } from '@/infra/db/repositories/pg/pg-clients-repository'
import { GetClientByUuidUseCase } from '../../use-cases/clients/get-client-by-uuid'

export function makeGetClientByUuidUseCase() {
  const repo = new PgClientsRepository()
  return new GetClientByUuidUseCase(repo)
}
