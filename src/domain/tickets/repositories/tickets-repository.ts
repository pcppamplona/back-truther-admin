import { Ticket, TicketComment } from "../model/tickets";

export interface TicketsRepository {
    //relation for ticket
    createTicket(data: Ticket): Promise<Ticket>
    findAll(): Promise<Ticket[]>
    findById(id: number): Promise<Ticket | null>
    updateById(id: number, data: Partial<Ticket>): Promise<Ticket>

    //relationb for ticket comment
    createComment(data: TicketComment): Promise<TicketComment>
    findCommentById(ticket_id: number): Promise<TicketComment[]>
}