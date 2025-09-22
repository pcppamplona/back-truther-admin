import { PaginatedResult, PaginationParams } from "@/shared/pagination";
import {
  FinalizationReply,
  FinalizeTicketInput,
  Reason,
  ReplyAction,
  Ticket,
  TicketComment,
} from "../model/tickets";

export interface TicketsRepository {
  createTicket(data: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findPaginated(params: PaginationParams): Promise<PaginatedResult<Ticket>>
  findById(id: number): Promise<Ticket | null>;
  updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket>;

  createTicketComment(data: TicketComment): Promise<TicketComment>;
  findTicketCommentsById(ticket_id: number): Promise<TicketComment[]>;

  findTicketReasonByCategoryId(category_id: number): Promise<Reason[]>;
  findTicketReasonById(id: number): Promise<Reason | null>;

  findReplyReasonsByReasonId(reason_id: number): Promise<FinalizationReply[]>;
  findReplyReasonsActionsByReplyId(reply_id: number): Promise<ReplyAction[]>;

  finalizeTicket(data: FinalizeTicketInput): Promise<Ticket>;
}
