import type { Item } from '../model/item';

export interface ItemsRepository {
    findByGroupIds(groupIds: number[]): Promise<Item[]>;
}
