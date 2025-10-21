import { DeleteTicketReasonUseCase } from "@/application/use-cases/ticket-reason/delete-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";
import { PoolClient } from "pg";

export function makeDeleteTicketReasonUseCase(client?: PoolClient) {
  const repo = new PgTicketReasonRepository(client);
  return new DeleteTicketReasonUseCase(repo);
}