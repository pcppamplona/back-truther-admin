import { FinalizeTicketUseCase } from "@/application/use-cases/tickets/finalize-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeFinalizeTicket(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new FinalizeTicketUseCase(repo)
}