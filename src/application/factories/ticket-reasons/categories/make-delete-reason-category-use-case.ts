import { DeleteReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/delete-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";

export function makeDeleteReasonCategoryUseCase() {
  const repo = new PgReasonCategoriesRepository();
  return new DeleteReasonCategoryUseCase(repo);
}
