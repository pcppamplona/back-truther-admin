import { GetTicketReasonsByIdUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-by-id";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeGetTicketReasonsByIdUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketReasonsByIdUseCase(repo)
}