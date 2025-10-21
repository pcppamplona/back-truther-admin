import { DeleteActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/delete-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";
import { PoolClient } from "pg";

export function makeDeleteActionsTypeUseCase(client?: PoolClient) {
  const repo = new PgActionsTypeRepository(client);
  return new DeleteActionsTypeUseCase(repo);
}