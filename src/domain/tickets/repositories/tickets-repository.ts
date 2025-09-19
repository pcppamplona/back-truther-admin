import { Reason, Ticket, TicketComment } from "../model/tickets";

export interface TicketsRepository {
    //relation for ticket
    createTicket(data: Ticket): Promise<Ticket>
    findAll(): Promise<Ticket[]>
    findById(id: number): Promise<Ticket | null>
    updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket>

    //relationb for ticket comment
    createTicketComment(data: TicketComment): Promise<TicketComment>
    findTicketCommentsById(ticket_id: number): Promise<TicketComment[]>

    findTicketReasonByCategoryId(category_id: number): Promise<Reason[]>
    findTicketReasonById(id: number): Promise<Reason | null>
}