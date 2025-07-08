import type { Group, CreateGroup } from '../model/group';

export interface GroupsRepository {
    findById(id: number): Promise<Group | null>;
    findGroupAndDescendants(groupIds: number[]): Promise<number[]>;
    create(data: CreateGroup): Promise<{ id: number }>;
}
