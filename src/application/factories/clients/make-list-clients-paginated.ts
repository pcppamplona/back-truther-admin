import { PgClientsRepository } from "@/infra/db/repositories/pg/pg-clients-repository"
import { ListClientsPaginatedUseCase } from "../../use-cases/clients/list-clients-paginated"
import { PoolClient } from "pg"

export function makeListClientsPaginatedUseCase(client?: PoolClient) {
  const repo = new PgClientsRepository(client)
  return new ListClientsPaginatedUseCase(repo)
}
