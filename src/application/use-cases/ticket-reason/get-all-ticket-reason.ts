import { TicketReason } from "@/domain/reasons/model/ticket-reasons";
import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";

export class GetAllTicketReasonsUseCase {
  constructor(private ticketReasonRepository: TicketReasonRepository) {}

  async execute(): Promise<TicketReason[]> {
    return this.ticketReasonRepository.findAll();
  }
}