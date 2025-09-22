import { GetTicketsPaginatedUseCase } from "@/application/use-cases/tickets/get-tickets-paginated"
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository"

export function makeGetTicketsPaginatedUseCase() {
  const repo = new PgTicketRepository()
  return new GetTicketsPaginatedUseCase(repo)
}
