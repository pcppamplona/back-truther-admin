import { GetTicketCommentUseCase } from "@/application/use-cases/tickets/get-ticket-comment";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeGetTicketCommentUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketCommentUseCase(repo)
}