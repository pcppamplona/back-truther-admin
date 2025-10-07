import { GetTicketsUseCase } from "@/application/use-cases/tickets/get-tickets";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeGetTicketsUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketsUseCase(repo)
}