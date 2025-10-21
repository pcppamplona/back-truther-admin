import { Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";

export class UpdateTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute(id: number, data: Partial<Ticket>): Promise<Ticket> {
    return this.ticketsRepository.updateTicket(id, data);
  }
}
