import { GetTicketReasonsReplyUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-reply";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeTicketReasonsReplyUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketReasonsReplyUseCase(repo)
}