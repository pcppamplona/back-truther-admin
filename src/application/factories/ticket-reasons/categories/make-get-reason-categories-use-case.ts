import { GetReasonCategoriesUseCase } from "@/application/use-cases/ticket-reason/categories/get-reason-categories";
import { PgReasonCategoriesRepository } from "@/infra/db/repositories/pg/pg-reason-categories-repository";

export function makeGetReasonCategoriesUseCase() {
  const repo = new PgReasonCategoriesRepository();
  return new GetReasonCategoriesUseCase(repo);
}
