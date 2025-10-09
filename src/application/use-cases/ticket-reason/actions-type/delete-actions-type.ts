import { ActionsTypeRepository } from "@/domain/reasons/repositories/actions-type-repository";

export class DeleteActionsTypeUseCase {
  constructor(private repo: ActionsTypeRepository) {}
  async execute(id: number) { return this.repo.delete(id); }
}
