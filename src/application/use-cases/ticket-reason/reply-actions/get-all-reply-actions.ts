import { ReplyAction } from "@/domain/reasons/model/ticket-reasons";
import { ReplyActionsRepository } from "@/domain/reasons/repositories/reply-actions-repository";

export class GetAllReplyActionsUseCase {
  constructor(private replyActionsRepository: ReplyActionsRepository) {}

  async execute(): Promise<ReplyAction[]> {
    return this.replyActionsRepository.findAll();
  }
}