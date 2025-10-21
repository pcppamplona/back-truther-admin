import { CreateTicketReasonUseCase } from "@/application/use-cases/ticket-reason/create-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";
import { PoolClient } from "pg";

export function makeCreateTicketReasonUseCase(client?: PoolClient) {
  const repo = new PgTicketReasonRepository(client);
  return new CreateTicketReasonUseCase(repo);
}
