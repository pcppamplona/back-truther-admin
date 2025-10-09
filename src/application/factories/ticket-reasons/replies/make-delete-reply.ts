import { DeleteReplyUseCase } from "@/application/use-cases/ticket-reason/replies/delete-reply";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";

export function makeDeleteReplyUseCase() {
  const repo = new PgReplyReasonsRepository();
  return new DeleteReplyUseCase(repo);
}