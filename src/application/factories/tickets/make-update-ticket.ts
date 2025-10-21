import { UpdateTicketUseCase } from "@/application/use-cases/tickets/update-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";
import { PoolClient } from "pg";

export function makeUpdateTicketUseCase(client?: PoolClient) {
  const repo = new PgTicketRepository(client);
  return new UpdateTicketUseCase(repo);
}
