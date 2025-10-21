import { GetReasonCategoryByIdUseCase } from "@/application/use-cases/ticket-reason/categories/get-reason-category-by-id";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";
import { PoolClient } from "pg";

export function makeGetReasonCategoryByIdUseCase(client?: PoolClient) {
  const repo = new PgReasonCategoriesRepository(client);
  return new GetReasonCategoryByIdUseCase(repo);
}
