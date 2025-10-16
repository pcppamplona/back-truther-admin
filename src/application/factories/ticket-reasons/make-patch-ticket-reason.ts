import { PatchTicketReasonUseCase } from "@/application/use-cases/ticket-reason/patch-ticker-reason";
import { PgTicketReasonRepository } from "@/infra/db/repositories/pg/pg-ticket-reasons-repository";

export function makePatchTicketReasonUseCase() {
  const repo = new PgTicketReasonRepository();
  return new PatchTicketReasonUseCase(repo);
}

