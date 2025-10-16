import { ReplyReasonsRepository } from "@/domain/reasons/repositories/reply-reasons-repository";

export class GetRepliesByReasonUseCase {
  constructor(private repo: ReplyReasonsRepository) {}
  async execute(reason_id: number) { return this.repo.findByReasonId(reason_id); }
}