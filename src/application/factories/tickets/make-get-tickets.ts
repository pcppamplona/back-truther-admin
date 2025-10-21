import { GetTicketsUseCase } from "@/application/use-cases/tickets/get-tickets";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeGetTicketsUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketsUseCase(repo)
}