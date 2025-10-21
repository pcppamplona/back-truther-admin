import { GetActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/get-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";
import { PoolClient } from "pg";

export function makeGetActionsTypeUseCase(client?: PoolClient) {
  const repo = new PgActionsTypeRepository(client);
  return new GetActionsTypeUseCase(repo);
}