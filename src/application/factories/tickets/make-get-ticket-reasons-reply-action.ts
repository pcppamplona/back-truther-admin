import { GetTicketReasonsReplyActionsUseCase } from "@/application/use-cases/tickets/get-ticket-reasons-reply-actions";
import { PgTicketRepository } from "@/infra/db/repositories/pg/pg-ticket-repository";

export function makeTicketReasonsReplyActionsUseCase() {
    const repo = new PgTicketRepository()
    return new GetTicketReasonsReplyActionsUseCase(repo)
}