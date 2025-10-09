import { GetRepliesByReasonUseCase } from "@/application/use-cases/ticket-reason/replies/get-replies-by-reason";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";

export function makeGetRepliesByReasonUseCase() {
  const repo = new PgReplyReasonsRepository();
  return new GetRepliesByReasonUseCase(repo);
}