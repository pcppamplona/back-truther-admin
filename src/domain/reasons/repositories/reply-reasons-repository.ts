import { ReplyReason } from "@/domain/reasons/model/ticket-reasons";

export interface ReplyReasonsRepository {
  create(data: { reason_id: number; reply: string; comment: boolean }): Promise<ReplyReason>;
  findByReasonId(reason_id: number): Promise<ReplyReason[]>;
  delete(id: number): Promise<void>;
}
