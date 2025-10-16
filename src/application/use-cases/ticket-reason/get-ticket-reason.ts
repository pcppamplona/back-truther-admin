import { TicketReason } from "@/domain/reasons/model/ticket-reasons";
import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";

export class GetTicketReasonByIdUseCase {
  constructor(private ticketReasonRepository: TicketReasonRepository) {}

  async execute(id: number): Promise<TicketReason | null> {
    return this.ticketReasonRepository.findById(id);
  }
}