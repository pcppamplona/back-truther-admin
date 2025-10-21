import { GetReplyActionsUseCase } from "@/application/use-cases/ticket-reason/reply-actions/get-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";
import { PoolClient } from "pg";

export function makeGetReplyActionsUseCase(client?: PoolClient) {
  const repo = new PgReplyActionsRepository(client);
  return new GetReplyActionsUseCase(repo);
}