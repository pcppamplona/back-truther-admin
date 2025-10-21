import { UpdateReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/update-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";
import { PoolClient } from "pg";

export function makeUpdateReasonCategoryUseCase(client?: PoolClient) {
  const repo = new PgReasonCategoriesRepository(client);
  return new UpdateReasonCategoryUseCase(repo);
}
