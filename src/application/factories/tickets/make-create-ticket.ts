import { CreateTicketUseCase } from "@/application/use-cases/tickets/create-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeCreateTicketUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new CreateTicketUseCase(repo)
}