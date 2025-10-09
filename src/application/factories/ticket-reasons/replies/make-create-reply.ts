import { CreateReplyUseCase } from "@/application/use-cases/ticket-reason/replies/create-reply";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";

export function makeCreateReplyUseCase() {
  const repo = new PgReplyReasonsRepository();
  return new CreateReplyUseCase(repo);
}