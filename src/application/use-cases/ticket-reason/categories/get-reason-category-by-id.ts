import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";

export class GetReasonCategoryByIdUseCase {
  constructor(private repo: ReasonCategoriesRepository) {}

  async execute(id: number) {
    return this.repo.findById(id);
  }
}
