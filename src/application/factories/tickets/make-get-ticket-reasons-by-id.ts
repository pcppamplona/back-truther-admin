import { GetTicketReasonsByIdUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-by-id";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeGetTicketReasonsByIdUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketReasonsByIdUseCase(repo)
}