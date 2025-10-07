import { Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketsUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(): Promise<Ticket[]> {
        return this.ticketsRepository.findAll()
    }
}