import { GetTicketReasonsByCategoryUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-category";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeGetTicketReasonsByCategoryUseCase(client?: PoolClient) {
    const repo = new PgTicketRepository(client)
    return new GetTicketReasonsByCategoryUseCase(repo)
}