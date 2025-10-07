import { GetTicketReasonsByCategoryUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-category";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeGetTicketReasonsByCategoryUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketReasonsByCategoryUseCase(repo)
}