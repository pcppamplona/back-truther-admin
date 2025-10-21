import { GetTicketByIdUseCase } from "@/application/use-cases/tickets/get-ticket-by-id";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeGetTicketByIdUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketByIdUseCase(repo)
}