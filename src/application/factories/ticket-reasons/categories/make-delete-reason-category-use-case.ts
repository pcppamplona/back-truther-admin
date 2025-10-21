import { DeleteReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/delete-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";
import { PoolClient } from "pg";

export function makeDeleteReasonCategoryUseCase(client?: PoolClient) {
  const repo = new PgReasonCategoriesRepository(client);
  return new DeleteReasonCategoryUseCase(repo);
}
