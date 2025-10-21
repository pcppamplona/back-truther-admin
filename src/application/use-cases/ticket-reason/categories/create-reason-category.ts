import { ReasonCategoriesRepository } from "@/domain/reasons/repositories/reason-categories-repository";

interface CreateReasonCategoryDTO {
  type: string;
  description: string;
}

export class CreateReasonCategoryUseCase {
  constructor(private repo: ReasonCategoriesRepository) {}

  async execute(data: CreateReasonCategoryDTO) {
    return this.repo.createCategory(data);
  }
}
