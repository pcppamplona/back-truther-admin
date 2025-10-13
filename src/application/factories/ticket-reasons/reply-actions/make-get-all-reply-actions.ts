import { GetAllReplyActionsUseCase } from "@/application/use-cases/ticket-reason/reply-actions/get-all-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";

export function makeGetAllReplyActionsUseCase() {
  const repo = new PgReplyActionsRepository();
  return new GetAllReplyActionsUseCase(repo);
}