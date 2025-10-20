import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";

interface UpdateReasonCategoryDTO {
  type?: string;
  description?: string;
}

export class UpdateReasonCategoryUseCase {
  constructor(private repo: ReasonCategoriesRepository) {}

  async execute(id: number, data: UpdateReasonCategoryDTO) {
    return this.repo.updateCategory(id, data);
  }
}
