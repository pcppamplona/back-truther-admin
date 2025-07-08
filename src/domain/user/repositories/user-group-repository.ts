export interface UserGroupsRepository {
    findGroupIdsByUserId(userId: number): Promise<number[]>;
    addUserToGroup(userId: number, groupId: number, isMain?: boolean): Promise<void>;
}
