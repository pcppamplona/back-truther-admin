import { Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class CreateTicketUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(data: Ticket): Promise<Ticket | null> {
        return this.ticketsRepository.createTicket(data)
    }
}