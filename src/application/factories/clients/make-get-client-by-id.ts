import { GetClientByIdUseCase } from "@/application/use-cases/clients/get-client-by-id"
import { PgClientsRepository } from "@/infra/db/repositories/pg/pg-clients-repository"
import { PoolClient } from "pg"

export function makeGetClientByIdUseCase(client?: PoolClient) {
  const repo = new PgClientsRepository(client)
  return new GetClientByIdUseCase(repo)
}
