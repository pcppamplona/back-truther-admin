import { ActionsTypeRepository } from "@/domain/reasons/repositories/actions-type-repository";

export class GetActionsTypeUseCase {
  constructor(private repo: ActionsTypeRepository) {}
  async execute() { return this.repo.findAll(); }
}