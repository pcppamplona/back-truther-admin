import { GetActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/get-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";

export function makeGetActionsTypeUseCase() {
  const repo = new PgActionsTypeRepository();
  return new GetActionsTypeUseCase(repo);
}