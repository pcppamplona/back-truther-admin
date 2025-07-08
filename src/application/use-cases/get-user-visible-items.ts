import { GroupsRepository } from "@/domain/user/repositories/groups-repository"
import { UserGroupsRepository } from "@/domain/user/repositories/user-groups-repository"

interface GetUserVisibleGroupIdsUseCaseRequest {
  userId: number
}

interface GetUserVisibleGroupIdsUseCaseResponse {
  groupIds: number[]
}

export class GetUserVisibleGroupIdsUseCase {
  constructor(
    private userGroupsRepository: UserGroupsRepository,
    private groupsRepository: GroupsRepository,
  ) {}

  async execute({
    userId,
  }: GetUserVisibleGroupIdsUseCaseRequest): Promise<GetUserVisibleGroupIdsUseCaseResponse> {
    const userGroups = await this.userGroupsRepository.getGroupsByUserId(userId)

    const allGroupIds = new Set<number>()

    for (const userGroup of userGroups) {
      allGroupIds.add(userGroup.groupId)

      const descendantIds = await this.groupsRepository.getAllDescendants(userGroup.groupId)
      descendantIds.forEach(id => allGroupIds.add(id))
    }

    return { groupIds: Array.from(allGroupIds) }
  }
}
