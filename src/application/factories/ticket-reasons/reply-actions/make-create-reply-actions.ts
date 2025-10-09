import { CreateReplyActionUseCase } from "@/application/use-cases/ticket-reason/reply-actions/create-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";

export function makeCreateReplyActionsUseCase() {
  const repo = new PgReplyActionsRepository();
  return new CreateReplyActionUseCase(repo);
}