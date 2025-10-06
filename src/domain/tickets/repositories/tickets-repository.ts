import { PaginatedResult, PaginationParams } from "@/shared/pagination";
import {
  FinalizationReply,
  Reason,
  ReplyAction,
  Ticket,
  TicketComment,
  TicketData,
} from "../model/tickets";

export interface TicketsRepository {
  withTransaction<T>(fn: (txRepo: TicketsRepository) => Promise<T>): Promise<T>;

  createTicket(data: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findPaginated(params: PaginationParams): Promise<PaginatedResult<Ticket>>
  findById(id: number): Promise<TicketData | null>;
  updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket>;

  createTicketComment(data: TicketComment): Promise<TicketComment>;
  findTicketCommentsById(ticket_id: number): Promise<TicketComment[]>;

  findTicketReasonByCategoryId(category_id: number): Promise<Reason[]>;
  findTicketReasonById(id: number): Promise<Reason | null>;

  findReplyReasonsByReasonId(reason_id: number): Promise<FinalizationReply[]>;
  findReplyReasonsActionsByReplyId(reply_id: number): Promise<ReplyAction[]>;
}
