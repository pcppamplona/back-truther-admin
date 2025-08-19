import { PgClientsRepository } from "@/infra/db/repositories/pg/pg-clients-repository"
import { ListClientsPaginatedUseCase } from "../../use-cases/clients/list-clients-paginated"

export function makeListClientsPaginatedUseCase() {
  const repo = new PgClientsRepository()
  return new ListClientsPaginatedUseCase(repo)
}
