import { GetAllRepliesUseCase } from "@/application/use-cases/ticket-reason/replies/get-all-replies";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";
import { PoolClient } from "pg";

export function makeGetAllRepliesUseCase(client?: PoolClient) {
  const repo = new PgReplyReasonsRepository(client);
  return new GetAllRepliesUseCase(repo);
}