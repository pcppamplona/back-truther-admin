import { GetTicketReasonsReplyActionsUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-reply-actions";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeTicketReasonsReplyActionsUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketReasonsReplyActionsUseCase(repo)
}