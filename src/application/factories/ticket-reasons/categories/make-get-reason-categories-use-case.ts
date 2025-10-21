import { GetReasonCategoriesUseCase } from "@/application/use-cases/ticket-reason/categories/get-reason-categories";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";
import { PoolClient } from "pg";

export function makeGetReasonCategoriesUseCase(client?: PoolClient) {
  const repo = new PgReasonCategoriesRepository(client);
  return new GetReasonCategoriesUseCase(repo);
}
