import { GetTicketReasonByIdUseCase } from "@/application/use-cases/ticket-reason/get-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";
import { PoolClient } from "pg";

export function makeGetTicketReasonByIdUseCase(client?: PoolClient) {
  const repo = new PgTicketReasonRepository(client);
  return new GetTicketReasonByIdUseCase(repo);
}
