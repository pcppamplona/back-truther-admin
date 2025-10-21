import { PatchTicketReasonUseCase } from "@/application/use-cases/ticket-reason/patch-ticker-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";
import { PoolClient } from "pg";

export function makePatchTicketReasonUseCase(client?: PoolClient) {
  const repo = new PgTicketReasonRepository(client);
  return new PatchTicketReasonUseCase(repo);
}

