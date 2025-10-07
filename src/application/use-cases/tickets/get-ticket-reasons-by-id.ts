import { Reason } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsByIdUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(id: number): Promise<Reason | null> {
        return this.ticketsRepository.findTicketReasonById(id)
    }
}