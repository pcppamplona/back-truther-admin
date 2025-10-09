import { GetReplyActionsUseCase } from "@/application/use-cases/ticket-reason/reply-actions/get-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";

export function makeGetReplyActionsUseCase() {
  const repo = new PgReplyActionsRepository();
  return new GetReplyActionsUseCase(repo);
}