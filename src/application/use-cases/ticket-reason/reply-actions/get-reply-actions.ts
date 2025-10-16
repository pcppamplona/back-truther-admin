import { ReplyActionsRepository } from "@/domain/reasons/repositories/reply-actions-repository";

export class GetReplyActionsUseCase {
  constructor(private repo: ReplyActionsRepository) {}
  async execute(reply_id: number) { return this.repo.findByReplyId(reply_id); }
}