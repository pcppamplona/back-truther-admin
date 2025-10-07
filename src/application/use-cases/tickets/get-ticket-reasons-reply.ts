import { FinalizationReply } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsReplyUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(reason_id: number): Promise<FinalizationReply[] | null> {
        return this.ticketsRepository.findReplyReasonsByReasonId(reason_id)
    }
}