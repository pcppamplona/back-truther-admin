import { GetAllReplyActionsUseCase } from "@/application/use-cases/ticket-reason/reply-actions/get-all-reply-actions";
import { PgReplyActionsRepository } from "@/infra/db/repositories/pg/pg-reply-action-repository";
import { PoolClient } from "pg";

export function makeGetAllReplyActionsUseCase(client?: PoolClient) {
  const repo = new PgReplyActionsRepository(client);
  return new GetAllReplyActionsUseCase(repo);
}