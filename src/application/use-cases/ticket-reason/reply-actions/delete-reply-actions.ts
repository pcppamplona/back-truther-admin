import { ReplyActionsRepository } from "@/domain/reasons/repositories/reply-actions-repository";

export class DeleteReplyActionUseCase {
  constructor(private repo: ReplyActionsRepository) {}
  async execute(id: number) { return this.repo.delete(id); }
}
