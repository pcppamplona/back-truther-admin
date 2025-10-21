import { CreateReplyActionUseCase } from "@/application/use-cases/ticket-reason/reply-actions/create-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";
import { PoolClient } from "pg";

export function makeCreateReplyActionsUseCase(client?: PoolClient) {
  const repo = new PgReplyActionsRepository(client);
  return new CreateReplyActionUseCase(repo);
}