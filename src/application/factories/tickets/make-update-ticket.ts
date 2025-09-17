import { UpdateTicketUseCase } from "@/application/use-cases/tickets/update-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeUpdateTicketUseCase() {
  const repo = new PgTicketRepository();
  return new UpdateTicketUseCase(repo);
}
