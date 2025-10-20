import { CreateReasonCategoryUseCase } from "@/application/use-cases/ticket-reason/categories/create-reason-category";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";

export function makeCreateReasonCategoryUseCase() {
  const repo = new PgReasonCategoriesRepository();
  return new CreateReasonCategoryUseCase(repo);
}
