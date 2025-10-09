import { CreateTicketReasonUseCase } from "@/application/use-cases/ticket-reason/create-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";

export function makeCreateTicketReasonUseCase() {
  const repo = new PgTicketReasonRepository();
  return new CreateTicketReasonUseCase(repo);
}
