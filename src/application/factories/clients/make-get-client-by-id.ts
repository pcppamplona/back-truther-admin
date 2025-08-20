import { GetClientByIdUseCase } from "@/application/use-cases/clients/get-client-by-id"
import { PgClientsRepository } from "@/infra/db/repositories/pg/pg-clients-repository"

export function makeGetClientByIdUseCase() {
  const repo = new PgClientsRepository()
  return new GetClientByIdUseCase(repo)
}
