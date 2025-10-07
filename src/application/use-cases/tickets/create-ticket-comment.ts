import { Ticket, TicketComment } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class CreateTickeCommentUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(data: TicketComment): Promise<TicketComment | null> {
        return this.ticketsRepository.createTicketComment(data)
    }
}