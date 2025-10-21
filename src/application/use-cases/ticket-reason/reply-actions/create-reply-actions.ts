import { ReplyActionsRepository } from "@/domain/reasons/repositories/reply-actions-repository";

export class CreateReplyActionUseCase {
  constructor(private repo: ReplyActionsRepository) {}
  async execute(data: any) { return this.repo.create(data); }
}