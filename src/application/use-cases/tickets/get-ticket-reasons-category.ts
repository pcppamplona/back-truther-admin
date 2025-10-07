import { Reason } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsByCategoryUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(category_id: number): Promise<Reason[] | null> {
        return this.ticketsRepository.findTicketReasonByCategoryId(category_id)
    }
}