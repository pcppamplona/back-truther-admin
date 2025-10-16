import { Group, TypeRecipient } from "@/domain/tickets/model/tickets";

export type TicketReason  = {
  id: number;
  category_id: number;
  type: string;
  reason: string;
  expired_at: number;
  description: string;
  type_recipient: TypeRecipient;
  recipient: string;
};

export interface ReplyReason {
  id: number;
  reason_id: number;
  reply: string;
  comment: boolean;
}

export interface ActionsType {
  id: number;
  type: string;
  created_at?: string;
}

export interface ReplyAction {
  id: number;
  reply_id: number;
  action_type_id: number;
  data_email: string | null;
  data_new_ticket_reason_id: number | null;
  data_new_ticket_assign_to_group: Group | null;
}
