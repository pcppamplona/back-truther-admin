import { CreateReplyUseCase } from "@/application/use-cases/ticket-reason/replies/create-reply";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";
import { PoolClient } from "pg";

export function makeCreateReplyUseCase(client?: PoolClient) {
  const repo = new PgReplyReasonsRepository(client);
  return new CreateReplyUseCase(repo);
}