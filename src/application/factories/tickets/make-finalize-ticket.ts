import { FinalizeTicketUseCase } from "@/application/use-cases/tickets/finalize-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeFinalizeTicket() {
    const repo = new PgTicketRepository()
    return new FinalizeTicketUseCase(repo)
}