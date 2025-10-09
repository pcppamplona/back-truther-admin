import { ReplyAction, TicketReason } from "../model/ticket-reasons";

export interface TicketReasonRepository {
  create(data: TicketReason, replies: Array<{ reply: string; comment: boolean; actions: ReplyAction[] }>): Promise<TicketReason>
  findById(id: number): Promise<TicketReason | null>
  findAll(): Promise<TicketReason[]>
  update(id: number, data: Partial<TicketReason>): Promise<void>
  delete(id: number): Promise<void>
}
