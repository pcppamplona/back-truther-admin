import { DeleteReplyActionUseCase } from "@/application/use-cases/ticket-reason/reply-actions/delete-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";
import { PoolClient } from "pg";

export function makeDeleteReplyActionsUseCase(client?: PoolClient) {
  const repo = new PgReplyActionsRepository(client);
  return new DeleteReplyActionUseCase(repo);
}
