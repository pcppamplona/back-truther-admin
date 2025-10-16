import { TicketReason } from "@/domain/reasons/model/ticket-reasons";
import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";

export class PatchTicketReasonUseCase {
  constructor(private ticketReasonRepository: TicketReasonRepository) {}

  async execute(id: number, data: Partial<TicketReason>): Promise<void> {
    return this.ticketReasonRepository.update(id, data);
  }
}
