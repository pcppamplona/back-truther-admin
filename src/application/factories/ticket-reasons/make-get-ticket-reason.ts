import { GetTicketReasonByIdUseCase } from "@/application/use-cases/ticket-reason/get-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";

export function makeGetTicketReasonByIdUseCase() {
  const repo = new PgTicketReasonRepository();
  return new GetTicketReasonByIdUseCase(repo);
}
