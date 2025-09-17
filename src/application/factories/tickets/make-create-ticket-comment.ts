import { CreateTickeCommentUseCase } from "@/application/use-cases/tickets/create-ticket-comment"
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository"

export function makeCreateTicketCommentUseCase() {
    const repo = new PgTicketRepository()
    return new CreateTickeCommentUseCase(repo)
}