import { GetRepliesByReasonUseCase } from "@/application/use-cases/ticket-reason/replies/get-replies-by-reason";
import { PgReplyReasonsRepository } from "@/infra/db/repositories/pg/pg-reply-reason-repository";
import { PoolClient } from "pg";

export function makeGetRepliesByReasonUseCase(client?: PoolClient) {
  const repo = new PgReplyReasonsRepository(client);
  return new GetRepliesByReasonUseCase(repo);
}