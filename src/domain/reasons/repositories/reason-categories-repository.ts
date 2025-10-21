import { ReasonCategories } from "../model/ticket-reasons";

export interface ReasonCategoriesRepository {
  createCategory(data: ReasonCategories): Promise<ReasonCategories>;
  findAll(): Promise<ReasonCategories[]>;
  findById(id: number): Promise<ReasonCategories | null>;
  updateCategory(id: number, data: Partial<ReasonCategories>): Promise<ReasonCategories>;
  delete(id: number): Promise<void>
}
