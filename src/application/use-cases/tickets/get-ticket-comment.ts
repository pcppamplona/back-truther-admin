import { Ticket, TicketComment } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketCommentUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(ticket_id: number): Promise<TicketComment[] | null> {
        return this.ticketsRepository.findTicketCommentsById(ticket_id)
    }
}