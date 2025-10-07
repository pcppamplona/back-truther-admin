import { GetTicketByIdUseCase } from "@/application/use-cases/tickets/get-ticket-by-id";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeGetTicketByIdUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketByIdUseCase(repo)
}