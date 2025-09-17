import { CreateTicketUseCase } from "@/application/use-cases/tickets/create-ticket";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeCreateTicketUseCase() {
    const repo = new PgTicketRepository()
    return new CreateTicketUseCase(repo)
}