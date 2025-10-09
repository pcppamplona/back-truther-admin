import { ActionsTypeRepository } from "@/domain/reasons/repositories/actions-type-repository";

export class CreateActionsTypeUseCase {
  constructor(private repo: ActionsTypeRepository) {}
  async execute(type: string) { return this.repo.create(type); }
}