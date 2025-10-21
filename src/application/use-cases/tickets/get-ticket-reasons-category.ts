
import { TicketReason } from "@/domain/reasons/model/ticket-reasons";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsByCategoryUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(category_id: number): Promise<TicketReason[] | null> {
        return this.ticketsRepository.findTicketReasonByCategoryId(category_id)
    }
}