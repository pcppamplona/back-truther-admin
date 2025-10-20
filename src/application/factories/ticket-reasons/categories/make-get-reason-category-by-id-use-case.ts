import { GetReasonCategoryByIdUseCase } from "@/application/use-cases/ticket-reason/categories/get-reason-category-by-id";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";

export function makeGetReasonCategoryByIdUseCase() {
  const repo = new PgReasonCategoriesRepository();
  return new GetReasonCategoryByIdUseCase(repo);
}
