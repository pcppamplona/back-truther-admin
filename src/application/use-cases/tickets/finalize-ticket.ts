import { FinalizeTicketInput, Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class FinalizeTicketUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(data: FinalizeTicketInput): Promise<Ticket> {
        return this.ticketsRepository.finalizeTicket(data)
    }
}