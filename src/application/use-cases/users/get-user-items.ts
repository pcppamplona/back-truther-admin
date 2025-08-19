import { Item } from "@/domain/user/model/item";
import { GroupsRepository } from "@/domain/user/repositories/group-repository";
import { ItemsRepository } from "@/domain/user/repositories/item-repository";
import { UserGroupsRepository } from "@/domain/user/repositories/user-group-repository";

interface Input {
    userId: number;
}

interface Output {
    items: Item[];
}

export class GetUserItemsUseCase {
    constructor(
        private userGroupsRepository: UserGroupsRepository,
        private groupsRepository: GroupsRepository,
        private itemsRepository: ItemsRepository
    ) {}

    async execute({ userId }: Input): Promise<Output> {
        const userGroupIds = await this.userGroupsRepository.findGroupIdsByUserId(userId);

        const accessibleGroupIds = await this.groupsRepository.findGroupAndDescendants(userGroupIds);

        const items = await this.itemsRepository.findByGroupIds(accessibleGroupIds);

        return { items };
    }
}
