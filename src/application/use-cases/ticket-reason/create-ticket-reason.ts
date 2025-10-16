import {
  ReplyAction,
  TicketReason,
} from "@/domain/reasons/model/ticket-reasons";
import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";

export class CreateTicketReasonUseCase {
  constructor(private ticketReasonRepository: TicketReasonRepository) {}

  async execute(
    reason: TicketReason,
    replies: Array<{ reply: string; comment: boolean; actions: ReplyAction[] }>
  ): Promise<TicketReason | null> {
    return this.ticketReasonRepository.create(reason, replies);
  }
}
