import { CreateActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/create-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";

export function makeCreateActionsTypeUseCase() {
  const repo = new PgActionsTypeRepository();
  return new CreateActionsTypeUseCase(repo);
}