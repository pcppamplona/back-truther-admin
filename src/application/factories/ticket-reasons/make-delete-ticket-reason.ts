import { DeleteTicketReasonUseCase } from "@/application/use-cases/ticket-reason/delete-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";

export function makeDeleteTicketReasonUseCase() {
  const repo = new PgTicketReasonRepository();
  return new DeleteTicketReasonUseCase(repo);
}