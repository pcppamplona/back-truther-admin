import { ReplyAction } from "../model/ticket-reasons";

export interface ReplyActionsRepository {
  create(data: {
    reply_id: number;
    action_type_id: number;
    data_email: string | null;
    data_new_ticket_reason_id: number | null;
    data_new_ticket_assign_to_group: string | null;
  }): Promise<ReplyAction>;
  findByReplyId(reply_id: number): Promise<ReplyAction[]>;
  delete(id: number): Promise<void>;
  findAll(): Promise<ReplyAction[]>;
}