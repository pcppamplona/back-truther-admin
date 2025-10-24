import { TypeRecipient } from "@/domain/tickets/model/tickets";

export type TicketReason  = {
  id: number;
  category_id: number;
  reason: string;
  expired_at: number;
  description: string;
  type_recipient: TypeRecipient;
  recipient: number;
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
  description_action?: string;
}

export interface ReplyAction {
  id?: number;
  reply_id: number;
  action_type_id: number;
  data_email: string | null;
  data_new_ticket_reason_id: number | null;
  data_new_ticket_assign_role: number | null;
}

export interface ReasonCategories {
  id?: number;
  type: string;
  description: string;
}