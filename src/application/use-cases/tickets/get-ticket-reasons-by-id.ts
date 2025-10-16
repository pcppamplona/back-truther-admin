import { TicketReason } from "@/domain/reasons/model/ticket-reasons";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsByIdUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(id: number): Promise<TicketReason | null> {
        return this.ticketsRepository.findTicketReasonById(id)
    }
}