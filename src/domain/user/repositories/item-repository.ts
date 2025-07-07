import { ItemTeste } from "../model/group";

export interface ItemTesteRepository {
  findItemTesteByAccessibleGroups(userId: number): Promise<ItemTeste[]>;
}
