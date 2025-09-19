import { GetTicketReasonsReplyUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-reply";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeTicketReasonsReplyUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketReasonsReplyUseCase(repo)
}