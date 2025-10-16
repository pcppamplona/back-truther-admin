import { DeleteActionsTypeUseCase } from "@/application/use-cases/ticket-reason/actions-type/delete-actions-type";
import { PgActionsTypeRepository } from "@/infra/db/repositories/pg/pg-actions-type-repository";

export function makeDeleteActionsTypeUseCase() {
  const repo = new PgActionsTypeRepository();
  return new DeleteActionsTypeUseCase(repo);
}