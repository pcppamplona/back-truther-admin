import { ReplyReason } from "@/domain/reasons/model/ticket-reasons";
import { ReplyReasonsRepository } from "@/domain/reasons/repositories/reply-reasons-repository";

export class GetAllRepliesUseCase {
  constructor(private replyReasonsRepository: ReplyReasonsRepository) {}

  async execute(): Promise<ReplyReason[]> {
    return this.replyReasonsRepository.findAll();
  }
}