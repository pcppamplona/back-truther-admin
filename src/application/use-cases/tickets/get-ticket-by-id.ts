import { Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketByIdUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(id: number): Promise<Ticket | null> {
        return this.ticketsRepository.findById(id)
    }
}