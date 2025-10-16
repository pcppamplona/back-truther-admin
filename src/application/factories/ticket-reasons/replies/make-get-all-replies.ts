import { GetAllRepliesUseCase } from "@/application/use-cases/ticket-reason/replies/get-all-replies";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";

export function makeGetAllRepliesUseCase() {
  const repo = new PgReplyReasonsRepository();
  return new GetAllRepliesUseCase(repo);
}