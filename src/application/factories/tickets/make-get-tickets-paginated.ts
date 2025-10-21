import { GetTicketsPaginatedUseCase } from "@/application/use-cases/tickets/get-tickets-paginated"
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository"
import { PoolClient } from "pg"

export function makeGetTicketsPaginatedUseCase(client?: PoolClient) {
  const repo = new PgTicketRepository(client)
  return new GetTicketsPaginatedUseCase(repo)
}
