import { DeleteReplyActionUseCase } from "@/application/use-cases/ticket-reason/reply-actions/delete-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";

export function makeDeleteReplyActionsUseCase() {
  const repo = new PgReplyActionsRepository();
  return new DeleteReplyActionUseCase(repo);
}
