import { CreateActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/create-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";
import { PoolClient } from "pg";

export function makeCreateActionsTypeUseCase(client?: PoolClient) {
  const repo = new PgActionsTypeRepository(client);
  return new CreateActionsTypeUseCase(repo);
}