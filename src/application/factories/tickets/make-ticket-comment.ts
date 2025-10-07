import { GetTicketCommentUseCase } from "@/application/use-cases/tickets/get-ticket-comment";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeGetTicketCommentUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketCommentUseCase(repo)
}