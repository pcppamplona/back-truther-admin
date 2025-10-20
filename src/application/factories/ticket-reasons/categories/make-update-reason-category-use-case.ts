import { UpdateReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/update-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";

export function makeUpdateReasonCategoryUseCase() {
  const repo = new PgReasonCategoriesRepository();
  return new UpdateReasonCategoryUseCase(repo);
}
