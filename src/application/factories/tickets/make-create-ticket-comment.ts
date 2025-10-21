import { CreateTickeCommentUseCase } from "@/application/use-cases/tickets/create-ticket-comment"
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository"
import { PoolClient } from "pg"

export function makeCreateTicketCommentUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new CreateTickeCommentUseCase(repo)
}