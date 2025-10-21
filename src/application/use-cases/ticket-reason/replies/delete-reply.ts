import { ReplyReasonsRepository } from "@/domain/reasons/repositories/reply-reasons-repository";

export class DeleteReplyUseCase {
  constructor(private repo: ReplyReasonsRepository) {}
  async execute(id: number) { return this.repo.delete(id); }
}