import { ItemTeste } from "@/domain/user/model/group";
import { ItemTesteRepository } from "@/domain/user/repositories/item-repository";


interface ListAccessibleItemTesteRequest {
  userId: number;
}

interface ListAccessibleItemTesteResponse {
  items: ItemTeste[];
}

export class ListAccessibleItemTesteUseCase {
  constructor(private readonly itemTesteRepository: ItemTesteRepository) {}

  async execute({
    userId,
  }: ListAccessibleItemTesteRequest): Promise<ListAccessibleItemTesteResponse> {
    const items = await this.itemTesteRepository.findItemTesteByAccessibleGroups(userId);
    return { items };
  }
}
