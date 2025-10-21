import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";

export class GetReasonCategoriesUseCase {
  constructor(private repo: ReasonCategoriesRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
