import { DeleteReplyUseCase } from "@/application/use-cases/ticket-reason/replies/delete-reply";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";
import { PoolClient } from "pg";

export function makeDeleteReplyUseCase(client?: PoolClient) {
  const repo = new PgReplyReasonsRepository(client);
  return new DeleteReplyUseCase(repo);
}