import { GetAllTicketReasonsUseCase } from "@/application/use-cases/ticket-reason/get-all-ticket-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";

export function makeGetAllTicketReasonUseCase() {
  const repo = new PgTicketReasonRepository();
  return new GetAllTicketReasonsUseCase(repo);
}