import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";

export class DeleteReasonCategoryUseCase {
  constructor(private repo: ReasonCategoriesRepository) {}

  async execute(id: number) {
    return this.repo.delete(id);
  }
}
