import { CreateReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/create-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";
import { PoolClient } from "pg";

export function makeCreateReasonCategoryUseCase(client?: PoolClient) {
  const repo = new PgReasonCategoriesRepository(client);
  return new CreateReasonCategoryUseCase(repo);
}
