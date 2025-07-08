import { UserGroup } from "../model/group";

export interface UserGroupsRepository {
  getGroupsByUserId(userId: number): Promise<UserGroup[]>
}
