import { ReplyAction } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class GetTicketReasonsReplyActionsUseCase {
    constructor(private ticketsRepository: TicketsRepository){}

    async execute(reply_id: number): Promise<ReplyAction[] | null> {
        return this.ticketsRepository.findReplyReasonsActionsByReplyId(reply_id)
    }
}