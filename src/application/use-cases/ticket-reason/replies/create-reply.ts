import { ReplyReasonsRepository } from "@/domain/reasons/repositories/reply-reasons-repository";

export class CreateReplyUseCase {
  constructor(private repo: ReplyReasonsRepository) {}
  async execute(data: { reason_id: number; reply: string; comment: boolean }) {
    return this.repo.create(data);
  }
}