import { GetAllTicketReasonsUseCase } from "@/application/use-cases/ticket-reason/get-all-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";
import { PoolClient } from "pg";

export function makeGetAllTicketReasonUseCase(client?: PoolClient) {
  const repo = new PgTicketReasonRepository(client);
  return new GetAllTicketReasonsUseCase(repo);
}