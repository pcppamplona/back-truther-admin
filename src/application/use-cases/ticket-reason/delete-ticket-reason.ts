import { TicketReasonRepository } from "@/domain/reasons/repositories/ticket-reasons-repository";

export class DeleteTicketReasonUseCase {
  constructor(private ticketReasonRepository: TicketReasonRepository) {}

  async execute(id: number): Promise<void> {
    return this.ticketReasonRepository.delete(id);
  }
}
